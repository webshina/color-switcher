import { prisma } from '@/lib/prisma';
import sendGrid from '@sendgrid/mail';

export const sendMail = async (props: {
  toAddress: string;
  templateName: string;
  fromAddress?: string;
  variables?: { [key: string]: string };
}) => {
  // Get mail frame(header, footer) and template
  const outerFrame = await prisma.mailTemplate.findUnique({
    where: {
      name: 'OuterFrame',
    },
  });
  let mailTemplate = await prisma.mailTemplate.findUnique({
    where: {
      name: props.templateName,
    },
  });
  if (!outerFrame || !mailTemplate) {
    throw 'Template not found';
  }

  // Merge frame and template
  let mailHtml = outerFrame.content.replace(
    '<%CONTENT%>',
    mailTemplate.content
  );
  // Replace variables
  if (props.variables) {
    Object.entries(props.variables).forEach(([key, value]) => {
      mailHtml = mailHtml.replace(`<%${key}%>`, value);
    });
  }

  // SendGrid setting
  if (!process.env.SENDGRID_API_KEY) {
    throw 'SENDGRID_API_KEY not set';
  }
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  // Sendmail
  const msg = {
    to: props.toAddress,
    from: props.fromAddress ?? 'no-reply@p-studio-u.com',
    subject: mailTemplate.title,
    html: mailHtml,
  };
  const res = await sendGrid.send(msg);

  return res;
};

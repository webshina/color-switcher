import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const mailTemplate = async () => {
  await prisma.mailTemplate.deleteMany();
  await prisma.mailTemplate.createMany({
    data: [
      {
        name: 'OuterFrame',
        title: '',
        content: `
        <div class="">
          <div class="aHl"></div>
          <div id=":rv" tabindex="-1"></div>
          <div
            id=":r9"
            class="ii gt"
            jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."
          >
            <div id=":s5" class="a3s aiL msg2950593170599995576">
              <u></u> <u></u>
              <div
                style="
                  width: 100% !important;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                "
              >
                <span
                  style="
                    color: blue;
                    display: none !important;
                    height: 0;
                    opacity: 0;
                    width: 0;
                  "
                  >Share your honest feedback &amp; feature requests</span
                >
                <table
                  bgcolor="#f4f4f4"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="table-layout: fixed"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td align="center" valign="top">
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="m_2950593170599995576pc-email-container"
                          role="presentation"
                          style="margin: 0 auto; max-width: 620px"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td align="left" style="padding: 0 10px" valign="top">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        height="20"
                                        style="font-size: 1px; line-height: 1px"
                                      ></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td valign="top">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                bgcolor="#f4f4f4"
                                                style="background-color: #f4f4f4"
                                                valign="top"
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  width="100%"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="padding: 17px 40px 0px"
                                                        valign="top"
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          role="presentation"
                                                          width="100%"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                align="center"
                                                                valign="top"
                                                              >
                                                                PERSONAL TRAINING STUDIO U
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                class="m_2950593170599995576pc-sm-h-53 m_2950593170599995576pc-xs-h-43"
                                                                height="18"
                                                                style="
                                                                  line-height: 1px;
                                                                  font-size: 1px;
                                                                "
                                                              ></td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                bgcolor="#ffffff"
                                                style="
                                                  padding: 20px 35px 0px;
                                                  background-color: #ffffff;
                                                "
                                                valign="top"
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  width="100%"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 40px 5px;
                                                          font-family: 'Fira Sans',
                                                            Helvetica, Arial, sans-serif;
                                                          font-size: 16px;
                                                          font-weight: 300;
                                                          line-height: 28px;
                                                          letter-spacing: -0.2px;
                                                          color: #000000;
                                                          text-align: center;
                                                        "
                                                        valign="top"
                                                      >
                                                        <%CONTENT%>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td
                                                        height="0"
                                                        style="
                                                          line-height: 1px;
                                                          font-size: 1px;
                                                        "
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                height="8"
                                                style="font-size: 1px; line-height: 1px"
                                              ></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                bgcolor="#ffffff"
                                                style="
                                                  padding: 25px 40px 31px;
                                                  background-color: #ffffff;
                                                "
                                                valign="top"
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation"
                                                  width="100%"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          font-family: 'Fira Sans',
                                                            Helvetica, Arial, sans-serif;
                                                          font-size: 16px;
                                                          font-weight: 300;
                                                          line-height: 28px;
                                                          color: #000000;
                                                          text-align: center;
                                                        "
                                                        valign="top"
                                                      >
                                                        Cheers,<br />
                                                        <strong>PERSONAL TRAINING STUDIO U</strong>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                height="8"
                                                style="font-size: 1px; line-height: 1px"
                                              ></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          width="100%"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                bgcolor="#f4f4f4"
                                                style="
                                                  padding: 25px 40px 24px;
                                                  background-color: #f4f4f4;
                                                "
                                                valign="top"
                                              ></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  width="100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        height="20"
                                        style="font-size: 1px; line-height: 1px"
                                      ></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        `,
      },
    ],
  });
};

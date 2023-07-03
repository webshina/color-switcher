import { ChannelRepository } from '@/repositories/ChannelRepository';
import { Request, Response } from 'express';
import Formidable from 'formidable';

const updateChannels = async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const { orders } = req.body;

  await ChannelRepository.updateOrder({
    guildId: Number(guildId),
    params: {
      orders,
    },
  });

  return res.json('success');
};

const updateChannel = async (req: Request, res: Response) => {
  const { channelId } = req.params;

  const form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const {} = fields;
    const { image } = files;
    await ChannelRepository.update(Number(channelId), {
      image: image as Formidable.File,
    });

    return res.json('success');
  });
};

export default { updateChannels, updateChannel };

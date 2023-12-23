import User from "../../models/User.js";
import Channel from "../../models/Channel.js";

export const getChannelDetails = async (req, res) => {
    try {
        const { channelId } = req.params;

        const channel = await Channel.findById(channelId);

        if (!channel || !channel.isActive) {
            return res.status(404).send("Channel not found");
        }
        

        const user = await User.findOne({ channel: channelId }, { username:1 });
        
        const streamUrl = `http://localhost:8000/live/${channel.streamKey}.flv`;

        const isOnline = false;

        return res.status(200).json({
            id: channel._id,
            title: channel.title,
            description: channel.description,
            username: user.username,
            streamUrl: streamUrl,
            isOnline,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Channel not found. Please check channel url");
    }
};
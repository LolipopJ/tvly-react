import React from 'react';
import ChannelCard from './channel/channelCard';

export default function MainView(props) {
  return (
    <div>
      <ChannelCard {...props} />
      <ChannelCard {...props} />
      <ChannelCard {...props} />
      <ChannelCard {...props} />
      <ChannelCard {...props} />
      <ChannelCard {...props} />
    </div>
  );
}

import { useFloating } from '@floating-ui/react-dom';
import { useState } from 'react';
import { Popover } from 'react-tiny-popover';

export default function Search() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom']} // preferred positions by priority
      content={<div className='align-left'>Hi! I'm popover content.</div>}
    >
      <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click me!</div>
    </Popover>
  );
}

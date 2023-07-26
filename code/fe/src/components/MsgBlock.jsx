import React from 'react'

function MsgBlock({message}) {
	return (
		<div className='msg_block'>
			{message ? <span className={message.msgClass}>{message.text}</span> : <span></span>}
		</div>
	)
}

export default MsgBlock

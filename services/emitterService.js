var emitterService = function (emitterKey, baseChannel)
{
	var emitter = null;	
	return	{
		connect: function(connectionHandler)
        {
			emitter = window.emitter.connect({/*host: "10.0.0.20"*//*, secure: true*/ });
			emitter.on("connect", connectionHandler);
		},
		subscribe: function(channel, handler, last=0)
        {
			defaultHandler = handler;
			emitter.subscribe({
				key: emitterKey,
				channel: baseChannel + "/" + channel,
				last});
			emitter.on("message", function(msg) {handler(msg.asObject());});
		},
		publish: function(type, data, channel)
        {
			emitter.publish({
				key: emitterKey,
				channel: baseChannel + "/" + channel,
				ttl: 3600,
				message: JSON.stringify({
					type: type,
					data: data
				})
			});
		},
		
	}		
}
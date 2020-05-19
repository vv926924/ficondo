if (self.CavalryLogger) { CavalryLogger.start_js(["1MdZd"]); }

__d("RealtimeRequestStreamWebClientTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:RealtimeRequestStreamWebClientLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:RealtimeRequestStreamWebClientLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:RealtimeRequestStreamWebClientLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setClientSessionID=function(a){this.$1.client_session_id=a;return this};c.setClientTimeMs=function(a){this.$1.client_time_ms=a;return this};c.setMessage=function(a){this.$1.message=a;return this};c.setSeverity=function(a){this.$1.severity=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setUserFbid=function(a){this.$1.user_fbid=a;return this};c.setVC=function(a){this.$1.vc=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};return a}();c={client_session_id:!0,client_time_ms:!0,message:!0,severity:!0,time:!0,user_fbid:!0,vc:!0,weight:!0};e.exports=a}),null);
__d("BladeRunnerConfig",["RTISubscriptionManagerConfig"],(function(a,b,c,d,e,f){var g="javascript-sandbox";a=function(){"use strict";function a(){}var c=a.prototype;c.patchRequestHeaders=function(a){var c={},d=b("RTISubscriptionManagerConfig").bladerunner_www_sandbox;d!=null&&(c[g]=d);for(var e in a)c[e]=a[e];return c};return a}();c=new a();e.exports=c}),null);
__d("RequestStreamE2EClientLoggerEvent",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({RECEIVED:"received",SENT:"sent",FAILURE:"failure",PUBACK:"puback"})}),null);
__d("RequestStreamE2EClientLoggerMessageType",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({REQUEST_STREAM:"request_stream",AMENDMENT:"amendment",AMENDMENT_ACK:"amendment_ack",CANCEL:"cancel",RESPONSE:"response",RESPONSE_ACK:"response_ack",TIMED_REQUEST:"timed_request",INTERRUPT:"interrupt"})}),null);
__d("BladeRunnerLogger",["BanzaiLogger","BanzaiODS","BladeRunnerTypes","CurrentUser","FBLogger","MqttPublishListener","Random","RealtimeRequestStreamWebClientTypedLogger","RequestStreamE2EClientLoggerEvent","RequestStreamE2EClientLoggerMessageType","RequestStreamE2EClientSamplingConfig","gkx"],(function(a,b,c,d,e,f){var g=b("MqttPublishListener").MqttPublishEvent,h="bladerunner_js_client",i={info:"info",warning:"warning",exception:"exception"};a=function(){"use strict";function a(){this.$1=this.$4(),this.setFBLoggerLevel(1)}var c=a.prototype;c.info=function(a){this.$3>=2&&b("FBLogger")(h).info("BladeRunner info: %s",a),this.$5(i.info,a)};c.warn=function(a){this.$3>=1&&b("FBLogger")(h).warn("BladeRunner warn: %s",a),this.$5(i.warning,a)};c.exception=function(a,c){c===void 0&&(c="");var d=c+" "+a.toString();this.$3>=0&&b("FBLogger")(h).warn("BladeRunner exception: %s, %s",c,a.toString());this.$5(i.exception,d)};c.trimForLogging=function(a){var b=1024;return typeof a==="string"&&a.length>b?"[trimmed]:"+a.substring(0,b)+"...":a};c.bumpCounter=function(a,c){c===void 0&&(c=1),b("BanzaiODS").bumpEntityKey(2966,"BladeRunnerClient",a,c)};c.setClientSessionId=function(a){this.$2=a};c.setFBLoggerLevel=function(a){this.$3=a};c.$5=function(a,c){if(this.$1){a=new(b("RealtimeRequestStreamWebClientTypedLogger"))().setClientTimeMs(Date.now()).setSeverity(a).setMessage(this.trimForLogging(c)).setClientSessionID(this.$2).setUserFbid(b("CurrentUser").getID());a.log()}};c.$4=function(){return b("gkx")("676834")};c.shouldLogE2E=function(a){var c=b("RequestStreamE2EClientSamplingConfig").sampleRate;if(c>1&&a!=null){a=b("RequestStreamE2EClientSamplingConfig").methodToSamplingMultiplier[a];a===0?c=0:a!=null&&(c/=a)}return b("Random").coinflip(c)};c.logE2EEvent=function(a,c,d,e,f){c===void 0&&(c=b("RequestStreamE2EClientLoggerEvent").RECEIVED);d===void 0&&(d=null);e===void 0&&(e=null);f===void 0&&(f=null);if(d==null)return;a={request_id:d.requestId,message_type:a,event:c,method:e,timestamp:Date.now()/1e3};d.auxId&&(a.aux_id=d.auxId);f!=null&&(a.additional_data=f);b("BanzaiLogger").log("RequestStreamE2EClientLoggerConfig",a)};c.logFrameWithMQTTEvent=function(a,c){switch(c){case g.SENT:this.logFrame(a,b("RequestStreamE2EClientLoggerEvent").SENT);break;case g.ACKED:this.logFrame(a,b("RequestStreamE2EClientLoggerEvent").PUBACK);break;case g.NOT_ACKED:case g.NOT_CONNECTED:case g.PUBLISH_ERROR:this.logFrameFailure(a,c)}};c.logFrameFailure=function(a,c){this.logFrame(a,b("RequestStreamE2EClientLoggerEvent").FAILURE,{reason:c})};c.logFrame=function(a,c,d){d===void 0&&(d=null);var e=null,f=null,g=null;switch(a.type){case b("BladeRunnerTypes").StreamFrameType.REQUEST:e=b("RequestStreamE2EClientLoggerMessageType").REQUEST_STREAM;var h=a.getRequest();f=h.getHeaders().method;g=h.getInstrumentationData();break;case b("BladeRunnerTypes").StreamFrameType.DATA:e=b("RequestStreamE2EClientLoggerMessageType").AMENDMENT;g=a.getData().getInstrumentationData();break}g!=null&&e!=null&&this.logE2EEvent(e,c,g,f,d)};return a}();c=new a();e.exports=c}),null);
__d("BladeRunnerTypesInternal",["Base64","BladeRunnerLogger","BladeRunnerTypes"],(function(a,b,c,d,e,f){var g=function(){"use strict";function a(){}var b=a.prototype;b.getHeaders=function(){if(this.headers!=null)return this.headers;throw new Error("Expected headers")};b.getInstrumentationData=function(){if(this.instrumentationData!=null)try{return JSON.parse(this.instrumentationData)}catch(a){return null}else return null};a.readObject=function(b){var c=new a();c.streamId=n(b.streamId);c.requestType=n(b.requestType);c.payload=q(b.payload);c.headers=t(b.headers);c.extraHeader=q(b.extraHeader);c.requestTarget=q(b.requestTarget);c.instrumentationData=q(b.instrumentationData);return c};return a}(),h=function(){"use strict";function a(){}a.readObject=function(b){var c=new a();c.streamId=n(b.streamId);c.dataId=o(b.dataId);c.data=q(b.data);c.shouldAck=v(b.shouldAck);return c};var c=a.prototype;c.rawData=function(){if(this.data==null)throw new Error("Expected data");return this.data};c.decodeData=function(){if(this.data==null)throw new Error("Expected data");return b("Base64").decode(this.data)};c.setData=function(a){this.data=b("Base64").encode(a)};c.getInstrumentationData=function(){if(this.instrumentationData!=null)return JSON.parse(this.instrumentationData);else return null};return a}(),i=function(){"use strict";function a(){}a.readObject=function(b){var c=new a();c.streamId=n(b.streamId);c.dataId=n(b.dataId);c.success=u(b.success);c.message=q(b.message);c.code=o(b.code);return c};return a}();i.ACK_CODE_LANDED_AND_ACCEPTED=20;i.ACK_CODE_LANDED_BUT_NOT_ACCEPTED=21;i.ACK_CODE_FAILED_TO_LAND=50;var j=function(){"use strict";function a(){}a.readObject=function(b){var c=new a();c.streamId=o(b.streamId);c.message=q(b.message);return c};return a}(),k=function(){"use strict";function a(){}a.readObject=function(b){var c=new a();c.streamId=n(b.streamId);c.status=n(b.status);c.message=q(b.message);c.code=o(b.code);c.shouldRetry=v(b.shouldRetry);c.retryDelayMs=o(b.retryDelayMs);return c};return a}(),l=function(){"use strict";function a(){}a.readObject=function(b){var c=new a();c.streamId=n(b.streamId);c.newBody=q(b.newBody);c.newExtraHeader=q(b.newExtraHeader);c.patchExtraHeader=q(b.patchExtraHeader);c.killBody=v(b.killBody);c.temporary=v(b.temporary);return c};return a}(),m=function(){"use strict";function a(){}var c=a.prototype;c.getRequest=function(){if(this.type==b("BladeRunnerTypes").StreamFrameType.REQUEST&&this.request!=null)return this.request;throw new Error("Expected request")};c.getData=function(){if(this.type==b("BladeRunnerTypes").StreamFrameType.DATA&&this.data!=null)return this.data;throw new Error("Expected data")};c.getDataAck=function(){if(this.type==b("BladeRunnerTypes").StreamFrameType.DATA_ACK&&this.dataAck!=null)return this.dataAck;throw new Error("Expected dataAck")};c.getStatusUpdate=function(){if(this.type==b("BladeRunnerTypes").StreamFrameType.STATUS_UPDATE&&this.statusUpdate!=null)return this.statusUpdate;throw new Error("Expected status update")};c.getLog=function(){if(this.type==b("BladeRunnerTypes").StreamFrameType.LOG&&this.log!=null)return this.log;throw new Error("Expected log")};c.getRewriteRequest=function(){if(this.type==b("BladeRunnerTypes").StreamFrameType.REWRITE_REQUEST&&this.rewriteRequest!=null)return this.rewriteRequest;throw new Error("Expected rewrite request")};c.getStreamId=function(){if(this.type==b("BladeRunnerTypes").StreamFrameType.REQUEST&&this.request!=null)return this.request.streamId;if(this.type==b("BladeRunnerTypes").StreamFrameType.DATA&&this.data!=null)return this.data.streamId;if(this.type==b("BladeRunnerTypes").StreamFrameType.STATUS_UPDATE&&this.statusUpdate!=null)return this.statusUpdate.streamId;if(this.type==b("BladeRunnerTypes").StreamFrameType.LOG&&this.log!=null)return this.log.streamId;if(this.type==b("BladeRunnerTypes").StreamFrameType.REWRITE_REQUEST&&this.rewriteRequest!=null)return this.rewriteRequest.streamId;if(this.type==b("BladeRunnerTypes").StreamFrameType.DATA_ACK&&this.dataAck!=null)return this.dataAck.streamId;throw new Error("Frame with unexpected type")};c.isInstrumented=function(){if(this.type===b("BladeRunnerTypes").StreamFrameType.REQUEST)return this.getRequest().instrumentationData!=null;else if(this.type===b("BladeRunnerTypes").StreamFrameType.DATA)return this.getData().instrumentationData!=null;else return!1};a.readObject=function(c){var d=new a();d.type=n(c.type);switch(d.type){case b("BladeRunnerTypes").StreamFrameType.REQUEST:d.request=g.readObject(r(c.request));break;case b("BladeRunnerTypes").StreamFrameType.DATA:d.data=h.readObject(r(c.data));break;case b("BladeRunnerTypes").StreamFrameType.DATA_ACK:d.dataAck=i.readObject(r(c.dataAck));break;case b("BladeRunnerTypes").StreamFrameType.STATUS_UPDATE:d.statusUpdate=k.readObject(r(c.statusUpdate));break;case b("BladeRunnerTypes").StreamFrameType.LOG:d.log=j.readObject(r(c.log));break;case b("BladeRunnerTypes").StreamFrameType.REWRITE_REQUEST:d.rewriteRequest=l.readObject(r(c.rewriteRequest));break;default:b("BladeRunnerLogger").warn("Frame with unexpected type: "+d.type);return null}return d};a.newRequestFrame=function(c){var d=new a();d.type=b("BladeRunnerTypes").StreamFrameType.REQUEST;d.request=c;return d};a.newDataFrame=function(c){var d=new a();d.type=b("BladeRunnerTypes").StreamFrameType.DATA;d.data=c;return d};a.newDataAckFrame=function(c){var d=new a();d.type=b("BladeRunnerTypes").StreamFrameType.DATA_ACK;d.dataAck=c;return d};a.newStatusUpdateFrame=function(c){var d=new a();d.type=b("BladeRunnerTypes").StreamFrameType.STATUS_UPDATE;d.statusUpdate=c;return d};a.newLogFrame=function(c){var d=new a();d.type=b("BladeRunnerTypes").StreamFrameType.LOG;d.log=c;return d};a.newRewriteRequestFrame=function(c){var d=new a();d.type=b("BladeRunnerTypes").StreamFrameType.REWRITE_REQUEST;d.rewriteRequest=c;return d};return a}();a=function(){"use strict";function a(a,b,c){this.batchId=a,this.frames=b,this.instrumentationData=c}var b=a.prototype;b.getFrames=function(){if(this.frames!=null)return this.frames;throw new Error("Expected frames")};b.getInstrumentationData=function(){if(this.instrumentationData!=null)try{return JSON.parse(this.instrumentationData)}catch(a){return null}else return null};b.write=function(){return JSON.stringify(this)};b.isInstrumented=function(){return this.getFrames().some(function(a){return a.isInstrumented()})};a.read=function(b){b=JSON.parse(b);var c=b.batchId||0,d=[];for(var e=b.frames,f=Array.isArray(e),g=0,e=f?e:e[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var h;if(f){if(g>=e.length)break;h=e[g++]}else{g=e.next();if(g.done)break;h=g.value}h=h;h=m.readObject(h);h!=null&&d.push(h)}h=b.instrumentationData||null;return new a(c,d,h)};return a}();function n(a){if(typeof a==="number")return a;throw new Error("Expected number")}function o(a){return a==null?null:n(a)}function p(a){if(typeof a==="string")return a;throw new Error("Expected string")}function q(a){return a==null?null:p(a)}function r(a){if(typeof a==="object"&&a!=null)return a;throw new Error("Expected object")}function s(a){if(typeof a==="object"&&a!=null){var b=a,c={};Object.keys(b).forEach(function(a){var d=b[a];typeof d==="string"&&d!=null&&(c[a]=d)});return c}throw new Error("Expected string map")}function t(a){return a==null?null:s(a)}function u(a){if(typeof a==="boolean"&&a!=null)return a;throw new Error("Expected boolean")}function v(a){return a==null?null:u(a)}e.exports={GatewayStreamBatch:a,GatewayStreamData:h,GatewayStreamDataAck:i,GatewayStreamFrame:m,GatewayStreamLog:j,GatewayStreamRequest:g,GatewayStreamRewriteRequest:l,GatewayStreamStatusUpdate:k}}),null);
__d("BladeRunnerEventHandler",["BladeRunnerLogger","BladeRunnerTypes","BladeRunnerTypesInternal","RequestStreamE2EClientLoggerEvent","RequestStreamE2EClientLoggerMessageType","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){var g=1e3;a=function(){"use strict";function a(a,b,c){this.$2=a,this.$1=b,this.$3=c}var c=a.prototype;c.onProxyResponse=function(a){this.$4(a);var c=[];for(var d=a.getFrames(),e=Array.isArray(d),f=0,d=e?d:d[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var g;if(e){if(f>=d.length)break;g=d[f++]}else{f=d.next();if(f.done)break;g=f.value}g=g;this.$2.witnessFrame(g)&&c.push(g)}b("BladeRunnerLogger").logE2EEvent(b("RequestStreamE2EClientLoggerMessageType").RESPONSE,b("RequestStreamE2EClientLoggerEvent").SENT,a.getInstrumentationData());c.length>0&&this.$5(new(b("BladeRunnerTypesInternal").GatewayStreamBatch)(a.batchId,c,a.instrumentationData))};c.onDisconnect=function(){this.$2.resetErrors();var a=new(b("BladeRunnerTypesInternal").GatewayStreamStatusUpdate)();a.streamId=this.$2.getRequest().streamId;a.status=b("BladeRunnerTypes").StreamStatus.CLOSED;a.shouldRetry=!0;a.retryDelayMs=0;a=new(b("BladeRunnerTypesInternal").GatewayStreamBatch)(null,[b("BladeRunnerTypesInternal").GatewayStreamFrame.newStatusUpdateFrame(a)]);this.onProxyResponse(a)};c.$4=function(a){var c=this;a=a.getFrames().filter(function(a){return a.type==b("BladeRunnerTypes").StreamFrameType.STATUS_UPDATE});for(var a=a,d=Array.isArray(a),e=0,a=d?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var f;if(d){if(e>=a.length)break;f=a[e++]}else{e=a.next();if(e.done)break;f=e.value}f=f;f=f.getStatusUpdate();if(f.status==b("BladeRunnerTypes").StreamStatus.CLOSED||f.status==b("BladeRunnerTypes").StreamStatus.REJECTED){this.$2.onError();var h=f.shouldRetry!=null&&f.shouldRetry,i=f.message!=null?f.message:"null";if(h&&this.$2.getErrorCount()<=this.$2.getRetriesAllowed()){f.status=b("BladeRunnerTypes").StreamStatus.PAUSED;var j=g;f.retryDelayMs!=null&&(j=f.retryDelayMs);b("BladeRunnerLogger").info("Can retry: stream "+f.streamId+" closed with status "+f.status+", message "+i+". Error count: "+this.$2.getErrorCount()+", retryDelay "+j+"ms. Already retrying: "+this.$2.getRetryRequestScheduled().toString());this.$2.getRetryRequestScheduled()?b("BladeRunnerLogger").bumpCounter("stream_closed_already_retrying"):(b("BladeRunnerLogger").bumpCounter("stream_closed_will_retry"),this.$2.setRetryRequestScheduled(!0),j>0?b("setTimeoutAcrossTransitions")(function(){return c.$6()},j):this.$6())}else b("BladeRunnerLogger").info("Will not retry: stream "+f.streamId+" closed with status "+f.status+", message "+i+". Error count: "+this.$2.getErrorCount()+", shouldRetry "+h.toString()+". Already retrying: "+this.$2.getRetryRequestScheduled().toString()),h?b("BladeRunnerLogger").bumpCounter("stream_closed_retry_exceeded"):b("BladeRunnerLogger").bumpCounter("stream_closed_no_retry"),this.$3.removeStream(f.streamId)}}};c.$6=function(){this.$2.setRetryRequestScheduled(!1),this.$2.isAlive()&&this.$3.sendRetryStreamRequest(this.$2)};c.$5=function(a){b("BladeRunnerLogger").bumpCounter("send_to_handler");var c=[];this.$1.onBatch(a);for(var a=a.getFrames(),d=Array.isArray(a),e=0,a=d?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var f;if(d){if(e>=a.length)break;f=a[e++]}else{e=a.next();if(e.done)break;f=e.value}f=f;try{switch(f.type){case b("BladeRunnerTypes").StreamFrameType.DATA:this.$1.onData(f.getData());c.push(f.getData());break;case b("BladeRunnerTypes").StreamFrameType.STATUS_UPDATE:this.$1.onStatusUpdate(f.getStatusUpdate().status);break;case b("BladeRunnerTypes").StreamFrameType.LOG:f=f.getLog().message;f!=null&&this.$1.onLog(f);break;case b("BladeRunnerTypes").StreamFrameType.DATA_ACK:break;default:throw new Error("Frame with unexpected type")}}catch(a){b("BladeRunnerLogger").bumpCounter("send_to_handler_error"),b("BladeRunnerLogger").exception(a,"Failed sending frame to stream handler")}}this.$7(c)};c.$7=function(a){var c=[];for(var a=a,d=Array.isArray(a),e=0,a=d?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var f;if(d){if(e>=a.length)break;f=a[e++]}else{e=a.next();if(e.done)break;f=e.value}f=f;if(f.shouldAck===!0&&f.dataId!=null){var g=new(b("BladeRunnerTypesInternal").GatewayStreamDataAck)();g.streamId=f.streamId;g.dataId=f.dataId;g.success=!0;c.push(g)}}this.$3.sendDataAcks(c)};return a}();e.exports=a}),null);
__d("BladeRunnerSocket",["Promise","BladeRunnerEventHandler","BladeRunnerLogger","BladeRunnerTypes","BladeRunnerTypesInternal","FBMqttChannel","RequestStreamE2EClientLoggerEvent","RequestStreamE2EClientLoggerMessageType","uuid"],(function(a,b,c,d,e,f){"use strict";var g="Connected",h="Disconnected",i=511*1024,j="/br_sr",k="/sr_res",l=null;a=function(){function a(a){this.$1=[],this.$2=0,this.$3=0,this.$4=null,this.$5=0,this.$6=new Map(),this.$7=a!=null?a:b("FBMqttChannel"),this.$8=new Map(),b("BladeRunnerLogger").setClientSessionId(b("uuid")()),this.$9()}a.get=function(){l==null&&(l=new a(b("FBMqttChannel")));return l};var c=a.prototype;c.sendNewStreamRequest=function(c,d){d=new(b("BladeRunnerEventHandler"))(c,d,this);var e=c.getRequest();this.$6.set(e.streamId,d);this.getStreamCount()<=a.maxStreamCount?this.$10(e):(b("BladeRunnerLogger").bumpCounter("socket_request_throttled_max_streams"),b("BladeRunnerLogger").warn("Maximum stream count reached, will not send request: "+JSON.stringify(c.getRequest().getHeaders())),this.$11(d,e.streamId))};c.sendRetryStreamRequest=function(a){this.$10(a.getRequest())};c.sendCancel=function(a){b("BladeRunnerLogger").bumpCounter("socket_send_cancel");var c=new(b("BladeRunnerTypesInternal").GatewayStreamStatusUpdate)();c.streamId=a;c.status=b("BladeRunnerTypes").StreamStatus.CLOSED;this.$12(c);this.removeStream(a)};c.sendAmendment=function(a,c,d){b("BladeRunnerLogger").bumpCounter("socket_send_amendment");var e=new(b("BladeRunnerTypesInternal").GatewayStreamData)();e.streamId=a;e.setData(c);d!=null&&(e.instrumentationData=d);this.$13(e)};c.sendAmendmentWithAck=function(a,c,d){var e=this;b("BladeRunnerLogger").bumpCounter("socket_send_amendment");var f=this.$14(),g=new(b("BladeRunnerTypesInternal").GatewayStreamData)();g.streamId=a;g.setData(c);g.shouldAck=!0;g.dataId=f;d!=null&&(g.instrumentationData=d);a=new(b("Promise"))(function(a,b){e.$8.set(f,{resolve:a,reject:b})});this.$13(g);return a};c.$13=function(a){this.$1.push(b("BladeRunnerTypesInternal").GatewayStreamFrame.newDataFrame(a)),this.$15()};c.sendDataAcks=function(a){b("BladeRunnerLogger").bumpCounter("socket_send_data_ack",a.length),this.$16(a)};c.removeStream=function(a){this.$6["delete"](a)};c.getStreamCount=function(){return this.$6.size};c.getNextStreamId=function(){this.$5++;return this.$5};c.onMQTTStateChanged=function(a){this.$15();if(a!=h&&a!=g||this.$4==a)return;this.$4=a;b("BladeRunnerLogger").info("MQTTStateChanged: "+a);a==h?(b("BladeRunnerLogger").bumpCounter("mqtt_state_disconnected"),this.$17()):a==g&&b("BladeRunnerLogger").bumpCounter("mqtt_state_connected")};c.$10=function(a){b("BladeRunnerLogger").bumpCounter("socket_send_request"),this.$1.push(b("BladeRunnerTypesInternal").GatewayStreamFrame.newRequestFrame(a)),this.$15()};c.$12=function(a){this.$1.push(b("BladeRunnerTypesInternal").GatewayStreamFrame.newStatusUpdateFrame(a)),this.$15()};c.$16=function(a){for(var a=a,c=Array.isArray(a),d=0,a=c?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var e;if(c){if(d>=a.length)break;e=a[d++]}else{d=a.next();if(d.done)break;e=d.value}e=e;this.$1.push(b("BladeRunnerTypesInternal").GatewayStreamFrame.newDataAckFrame(e))}this.$15()};c.$18=function(){this.$2++;return this.$2};c.$14=function(){this.$3++;return this.$3};c.$15=function(){if(this.$7.getConnectionState()===g&&this.$1.length>0){try{this.$19(this.$1)}finally{this.$1=[]}return!0}return!1};c.$19=function(a){var c=this,d=new(b("BladeRunnerTypesInternal").GatewayStreamBatch)(this.$18(),a),e=d.write();if(e.length>i){var f=Math.floor(a.length/2);if(f===0){var g=new Error("Publish is too long: "+e.length);a.forEach(function(a){return b("BladeRunnerLogger").logFrameFailure(a,"too long")});this.$20(d,g,"Publish is too long");throw g}this.$19(a.slice(0,f));this.$19(a.slice(f,a.length))}else try{b("BladeRunnerLogger").info("send message to "+j+" "+e);g={qos:1,skipBuffer:!1};d.isInstrumented()&&(g.listener={onEvent:function(c){for(var d=a,e=Array.isArray(d),f=0,d=e?d:d[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var g;if(e){if(f>=d.length)break;g=d[f++]}else{f=d.next();if(f.done)break;g=f.value}g=g;b("BladeRunnerLogger").logFrameWithMQTTEvent(g,c)}}});this.$7.publish(j,e,g)["catch"](function(a){c.$20(d,a,"Failed publishing to MQTT")});b("BladeRunnerLogger").bumpCounter("mqtt_publish_success")}catch(a){this.$20(d,a,"Failed publishing to MQTT");throw a}};c.$9=function(){var a=this;b("BladeRunnerLogger").info("Starting socket with endpoint "+this.$7.getEndpoint()+" useragent "+navigator.userAgent);this.onMQTTStateChanged(this.$7.getConnectionState());this.$7.subscribeChannelEvents({onMQTTStateChanged:function(b){a.onMQTTStateChanged(b)},onJSError:function(a){var c=a!=null&&typeof a.isRecoverable==="boolean"?a.isRecoverable:!1;c?b("BladeRunnerLogger").bumpCounter("mqtt_channel_recoverable_error"):(b("BladeRunnerLogger").warn("JS error in MQTTChannel: "+(typeof a=="object"&&a!=null?a.toString():"unknown error")+", "+JSON.stringify(a)),b("BladeRunnerLogger").bumpCounter("mqtt_channel_error"))}});this.$7.subscribe(j,function(a){throw new Error("Unexpected response: "+j+" "+a.toString())});this.$7.subscribe(k,function(b){a.$21(b)})};c.$21=function(a){a=b("BladeRunnerTypesInternal").GatewayStreamBatch.read(a);this.processBatch(a)};c.$20=function(a,c,d){for(var a=a.getFrames(),e=Array.isArray(a),f=0,a=e?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var g;if(e){if(f>=a.length)break;g=a[f++]}else{f=a.next();if(f.done)break;g=f.value}g=g;if(g.type===b("BladeRunnerTypes").StreamFrameType.REQUEST){var h=g.getRequest(),i=this.$6.get(h.streamId);i!=null&&this.$22(i,h.streamId,b("BladeRunnerTypes").StreamStatus.CLOSED,!0,null)}else if(g.type===b("BladeRunnerTypes").StreamFrameType.DATA){i=g.getData();h=i.dataId;if(i.shouldAck!=null&&i.shouldAck&&h!=null){g=new(b("BladeRunnerTypesInternal").GatewayStreamDataAck)();g.streamId=i.streamId;g.dataId=h;g.success=!1;g.code=b("BladeRunnerTypesInternal").GatewayStreamDataAck.ACK_CODE_FAILED_TO_LAND;g.message=d;this.$23(g)}}}b("BladeRunnerLogger").info("Failed publishing to MQTT: "+c.message);b("BladeRunnerLogger").bumpCounter("mqtt_publish_error")};c.$23=function(a){var c=this.$8.get(a.dataId);c!=null&&(this.$8["delete"](a.dataId),a.success?c.resolve(!0):a.code===b("BladeRunnerTypesInternal").GatewayStreamDataAck.ACK_CODE_LANDED_BUT_NOT_ACCEPTED?c.resolve(!1):c.reject(a.message))};c.processBatch=function(a){try{b("BladeRunnerLogger").logE2EEvent(b("RequestStreamE2EClientLoggerMessageType").RESPONSE,b("RequestStreamE2EClientLoggerEvent").RECEIVED,a.getInstrumentationData());b("BladeRunnerLogger").bumpCounter("socket_process_batch");var c=JSON.stringify(a);b("BladeRunnerLogger").info("Received batch "+c.substring(0,256)+(c.length>256?"...":""));c=null;for(var d=a.getFrames(),e=Array.isArray(d),f=0,d=e?d:d[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var g;if(e){if(f>=d.length)break;g=d[f++]}else{f=d.next();if(f.done)break;g=f.value}g=g;var h=g.getStreamId();c==null&&(c=h);if(h!=null&&c!=h)throw new Error("Received batch with frames for multiple streams");g.type==b("BladeRunnerTypes").StreamFrameType.DATA_ACK&&this.$23(g.getDataAck())}if(c!=null){h=this.$6.get(c);h!=null?h.onProxyResponse(a):b("BladeRunnerLogger").info("Received batch with frames for unknown stream id: "+c)}else b("BladeRunnerLogger").info("Received batch with no frames")}catch(a){b("BladeRunnerLogger").exception(a,"Failed processing batch from MQTT");b("BladeRunnerLogger").bumpCounter("socket_process_batch_error");throw a}};c.$17=function(){this.$6.forEach(function(a,b,c){a.onDisconnect()})};c.$11=function(a,c){this.$22(a,c,b("BladeRunnerTypes").StreamStatus.REJECTED,!1,0)};c.$22=function(a,c,d,e,f){var g=new(b("BladeRunnerTypesInternal").GatewayStreamStatusUpdate)();g.streamId=c;g.status=d;g.shouldRetry=e;g.retryDelayMs=f;c=new(b("BladeRunnerTypesInternal").GatewayStreamBatch)(null,[b("BladeRunnerTypesInternal").GatewayStreamFrame.newStatusUpdateFrame(g)]);a.onProxyResponse(c)};return a}();a.maxStreamCount=2e3;e.exports=a}),null);
__d("BladeRunnerStream",["regeneratorRuntime"],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this.$1=a}var c=a.prototype;c.getStreamHandler=function(){return this.$1};c.cancel=function(){};c.amendWithAck=function(a){return b("regeneratorRuntime").async(function(a){while(1)switch(a.prev=a.next){case 0:return a.abrupt("return",!1);case 1:case"end":return a.stop()}},null,this)};c.amendFireAndForget=function(a){};c.isAlive=function(){return!1};c.getStatus=function(){return null};c.getStreamId=function(){return 0};return a}();e.exports=a}),null);
__d("BladeRunnerStreamState",["BladeRunnerTypes","BladeRunnerTypesInternal"],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this.$1=a,this.$2=null,this.$3=0,this.$4=!1,this.$5=0,this.$6=!1}var c=a.prototype;c.getRequest=function(){return this.$1};c.isAlive=function(){return!(this.$2==b("BladeRunnerTypes").StreamStatus.CLOSED||this.$2==b("BladeRunnerTypes").StreamStatus.REJECTED)};c.canAmend=function(){return this.$2==b("BladeRunnerTypes").StreamStatus.ACCEPTED||this.$2==b("BladeRunnerTypes").StreamStatus.STARTED||this.$2==b("BladeRunnerTypes").StreamStatus.PAUSED};c.getLastStatus=function(){return this.$2};c.setLastStatus=function(a){this.$2=a};c.onError=function(){this.$3+=1};c.getErrorCount=function(){return this.$3};c.resetErrors=function(){this.$3=0};c.getRetryRequestScheduled=function(){return this.$6};c.setRetryRequestScheduled=function(a){this.$6=a};c.witnessFrame=function(a){switch(a.type){case b("BladeRunnerTypes").StreamFrameType.STATUS_UPDATE:var c=a.getStatusUpdate(),d=!0;switch(c.status){case b("BladeRunnerTypes").StreamStatus.ACCEPTED:d=!this.$4;this.$4||(this.$4=!0);break;case b("BladeRunnerTypes").StreamStatus.STARTED:d=this.getLastStatus()!=b("BladeRunnerTypes").StreamStatus.STARTED;break;case b("BladeRunnerTypes").StreamStatus.PAUSED:d=this.getLastStatus()==b("BladeRunnerTypes").StreamStatus.STARTED;break;case b("BladeRunnerTypes").StreamStatus.CLOSED:case b("BladeRunnerTypes").StreamStatus.REJECTED:default:d=!0}this.setLastStatus(c.status);return d;case b("BladeRunnerTypes").StreamFrameType.REWRITE_REQUEST:this.$7(a.getRewriteRequest());return!1;default:return!0}};c.setRetriesAllowed=function(a){this.$5=a};c.getRetriesAllowed=function(){return this.$5};c.$7=function(a){if(a.patchExtraHeader!=null)return;a.temporary!=null||a.temporary==!0||(a.newBody!=null&&(this.$1.payload=a.newBody),a.newExtraHeader!=null&&(this.$1.extraHeader=a.newExtraHeader,this.$1.headers=JSON.parse(a.newExtraHeader)),a.killBody!=null&&a.killBody==!0&&(this.$1.payload=null))};return a}();e.exports=a}),null);
__d("BladeRunnerSocketStream",["regeneratorRuntime","Promise","BladeRunnerLogger","BladeRunnerStream","BladeRunnerStreamState","BladeRunnerTypes","BladeRunnerTypesInternal","RequestStreamE2EClientLoggerEvent","RequestStreamE2EClientLoggerMessageType","uuid"],(function(a,b,c,d,e,f){var g=4,h={reason:"stream_dead"};a=function(a){"use strict";babelHelpers.inheritsLoose(c,a);function c(c,d,e,f){c=a.call(this,c)||this;c.$BladeRunnerSocketStream1=e;c.$BladeRunnerSocketStream2=new(b("BladeRunnerStreamState"))(d);c.$BladeRunnerSocketStream2.setRetriesAllowed(g);c.$BladeRunnerSocketStream3=f;return c}var d=c.prototype;d.send=function(){var a=this.$BladeRunnerSocketStream2.getRequest();b("BladeRunnerLogger").logE2EEvent(b("RequestStreamE2EClientLoggerMessageType").REQUEST_STREAM,b("RequestStreamE2EClientLoggerEvent").RECEIVED,a.getInstrumentationData(),a.getHeaders().method,this.$BladeRunnerSocketStream3?{clientForced:"true"}:null);this.$BladeRunnerSocketStream1.sendNewStreamRequest(this.$BladeRunnerSocketStream2,this.getStreamHandler())};d.amendWithAck=function(a){var c,d;return b("regeneratorRuntime").async(function(e){while(1)switch(e.prev=e.next){case 0:c=this.$BladeRunnerSocketStream2.getRequest();d=c.getInstrumentationData();d&&(d.auxId=b("uuid")(),b("BladeRunnerLogger").logE2EEvent(b("RequestStreamE2EClientLoggerMessageType").AMENDMENT,b("RequestStreamE2EClientLoggerEvent").RECEIVED,d));if(!this.canAmend()){e.next=5;break}return e.abrupt("return",this.$BladeRunnerSocketStream1.sendAmendmentWithAck(c.streamId,a,d==null?null:JSON.stringify(d)));case 5:b("BladeRunnerLogger").logE2EEvent(b("RequestStreamE2EClientLoggerMessageType").AMENDMENT,b("RequestStreamE2EClientLoggerEvent").FAILURE,d,null,h);return e.abrupt("return",b("Promise").reject("Stream is closed or not accepted"));case 7:case"end":return e.stop()}},null,this)};d.amendFireAndForget=function(a){var c=this.$BladeRunnerSocketStream2.getRequest();c=c.getInstrumentationData();c&&(c.auxId=b("uuid")(),b("BladeRunnerLogger").logE2EEvent(b("RequestStreamE2EClientLoggerMessageType").AMENDMENT,b("RequestStreamE2EClientLoggerEvent").RECEIVED,c));if(this.canAmend())this.$BladeRunnerSocketStream1.sendAmendment(this.$BladeRunnerSocketStream2.getRequest().streamId,a,c==null?null:JSON.stringify(c));else{b("BladeRunnerLogger").logE2EEvent(b("RequestStreamE2EClientLoggerMessageType").AMENDMENT,b("RequestStreamE2EClientLoggerEvent").FAILURE,c,null,h);throw new Error("Stream is closed or not accepted")}};d.cancel=function(){b("BladeRunnerLogger").logE2EEvent(b("RequestStreamE2EClientLoggerMessageType").CANCEL,b("RequestStreamE2EClientLoggerEvent").RECEIVED,this.$BladeRunnerSocketStream2.getRequest().getInstrumentationData()),this.isAlive()&&(this.$BladeRunnerSocketStream1.sendCancel(this.$BladeRunnerSocketStream2.getRequest().streamId),this.$BladeRunnerSocketStream2.setLastStatus(b("BladeRunnerTypes").StreamStatus.CLOSED))};d.isAlive=function(){return this.$BladeRunnerSocketStream2.isAlive()};d.canAmend=function(){return this.$BladeRunnerSocketStream2.canAmend()};d.getStatus=function(){return this.$BladeRunnerSocketStream2.getLastStatus()};d.getStreamId=function(){return this.$BladeRunnerSocketStream2.getRequest().streamId};return c}(b("BladeRunnerStream"));e.exports=a}),null);
__d("BladeRunnerClient",["Base64","BladeRunnerConfig","BladeRunnerLogger","BladeRunnerSocket","BladeRunnerSocketStream","BladeRunnerTypes","BladeRunnerTypesInternal","uuid"],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this.$1=a!=null?a:b("BladeRunnerSocket").get()}var c=a.prototype;c.requestStream=function(a,c,d,e){e===void 0&&(e={});var f=new(b("BladeRunnerTypesInternal").GatewayStreamRequest)();f.streamId=this.$1.getNextStreamId();f.requestType=b("BladeRunnerTypes").StreamRequestType.BLADE_RUNNER;f.headers=b("BladeRunnerConfig").patchRequestHeaders(a);f.extraHeader=JSON.stringify(f.headers);f.payload=c!=null?b("Base64").encode(c):null;a=e.requestId!=null;c=!1;a||(c=this.$2(f,e));(a||c)&&(f.instrumentationData=JSON.stringify(e));c=new(b("BladeRunnerSocketStream"))(d,f,this.$1,a);c.send();return c};c.logInfo=function(a){b("BladeRunnerLogger").info(a)};c.bumpCounter=function(a){b("BladeRunnerLogger").bumpCounter(a)};c.$2=function(a,c){if(c.requestId!=null)return!1;a=a.getHeaders().method;a=b("BladeRunnerLogger").shouldLogE2E(a);a&&(c.requestId=b("uuid")());return a};return a}();e.exports=a}),null);
__d("SkywalkerUtils",["CurrentLocale","RTISubscriptionManagerConfig"],(function(a,b,c,d,e,f){a={patchContext:function(a){a=a||{};a.locale=b("CurrentLocale").get();if(b("RTISubscriptionManagerConfig").assimilator){var c=b("RTISubscriptionManagerConfig").assimilator;c.tierType!=null&&(a.tierType=c.tierType);c.sandboxIP!=null&&c.sandboxPort!=null&&c.sandboxHostname!=null&&(a.sandboxIP=c.sandboxIP,a.sandboxPort=c.sandboxPort,a.sandboxHostname=c.sandboxHostname)}return a}};e.exports=a}),null);
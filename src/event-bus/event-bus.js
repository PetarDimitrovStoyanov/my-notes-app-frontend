import mitt from 'mitt';

const emitter = mitt();

export const EventBus = {
    emit: emitter.emit,
    on: emitter.on,
    off: emitter.off,
};

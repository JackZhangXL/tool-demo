class EventEmitter {
    constructor() {
        this._events = this._events || new Map();       // 储存事件，回调键值对
        this._maxListeners = this._maxListeners || 10;  // 设立监听上限
    }

    // 触发名为 type 的事件
    emit(type, ...args) {
        let handler = this._events.get(type);   // 从 this._events 中获取事件的回调函数

        /* 第一版
        if (args.length > 0) {  // Node 的 Event 模块在三个参数以下时用 call，否则用 apply，据说这样性能好
            handler.apply(this, args);
        } else {
            handler.call(this);
        }
        */

        /* 第二版 */
        if (Array.isArray(handler)) {   // 数组表示有多个listener，需要依次触发回调函数
            for (let i = 0; i < handler.length; i++) {
                if (args.length > 0) {
                    handler[i].apply(this, args);
                } else {
                    handler[i].call(this);
                }
            }
        } else {
            if (args.length > 0) {
                handler.apply(this, args);
            } else {
                handler.call(this);
            }
        }

        return true;
    };

    // 监听名为 type 的事件
    addListener(type, fn) {
        const handler = this._events.get(type);

        /* 第一版
        if (!handler) {      // 将事件与回调函数保存到 this._events
            this._events.set(type, fn);
        }
        */

        /* 第二版 */
        if (!handler) {                             // 将事件与回调函数保存到 this._events
            console.log(`events1`, this._events);
            this._events.set(type, fn);
            console.log(`events1`, this._events);
        } else if (typeof handler === 'function') { // 如果 handler 是函数，说明目前只有一个监听者，现在要让 handler 变成数组
            console.log(`events2`, this._events);
            this._events.set(type, [handler, fn]);
            console.log(`events2`, this._events)
        } else if (Array.isArray(handler)) {        // 如果 handler 是数组，说明已经有多个监听者，只要简单 push 进数组即可
            console.log(`events3`, this._events);
            handler.push(fn);
            console.log(`events3`, this._events);
        }
    }

    // 移除监听名为 type 的事件
    removeListener(type, fn) {
        const handler = this._events.get(type);

        if (!handler) {
            return null;
        } else if (typeof handler === 'function') { // 如果 handler 是函数，说明目前只有一个监听者，直接删除
            this._events.delete(type, fn);
        } else if (Array.isArray(handler)) {        // 如果 handler 是数组，说明已经有多个监听者，移除相应的监听者
            let position = -1;

            handler.forEach((item, index) => {
                if (item === fn) {
                    position = index;
                }
            });

            if (position === -1) {
                return null;
            }

            handler.splice(position, 1);

            if (handler.length === 1) {             // 如果清除后，数组内只有一个函数，那就取消数组，以函数形式保存
                this._events.set(type, handler[0]);
            }
        }
    }
}

module.exports = EventEmitter;

// 第二版执行结果：
// events1 Map {}
// events1 Map { 'person' => [Function] }
// events2 Map { 'person' => [Function] }
// events2 Map { 'person' => [ [Function], [Function] ] }
// events3 Map { 'person' => [ [Function], [Function] ] }
// events3 Map { 'person' => [ [Function], [Function], [Function] ] }

/**
 * @fileoverview These typings provide a "perfect-reexport" of deepFreeze that
 * is better optimized for the TypeScript typesystem.
 */

/**
 * Represents a recursively immutable variant of a type T.
 * With the exception of Map, Set, and Array (which become ReadonlyMap,
 * ReadonlySet, and ReadonlyArray, respectively), T and its properties are also
 * uninvokable.
 */
export type DeepFrozen<T> =
    // If T is an Array...
    T extends Array<infer U>?
    // Convert to ReadonlyArray (element type is recursively deep-frozen)
    ReadonlyArray<DeepFrozen<U>>:
    // If T is a Map...
    T extends Map<infer K, infer V>?
    // Convert to ReadonlyMap (key and value types are recursively deep-frozen)
    ReadonlyMap<DeepFrozen<K>, DeepFrozen<V>>:
    // If T is a Set...
    T extends Set<infer U>?
    // Convert to ReadonlySet (value type is recursively deep-frozen)
    ReadonlySet<DeepFrozen<U>>:
    // If T is a function...
    T extends Function ?
    // Functions can't be frozen, so provide an unusable type
    {__cannotFreezeFunctionType__: T} :
    // If T is an object... (note: this must come after all of the above)
    T extends object ?
    // Convert to readonly-mapped type (value types are recursively deep-frozen)
    {readonly[K in keyof T]: DeepFrozen<T[K]>} :
    // If T is a primitive...
    T extends(string|number|boolean|bigint|symbol) ?
    // Primitives are already immutable
    T :
    // Otherwise, provide an unusable type, since this case is unexpected.
    {__cannotFreezeType__: T};

/**
 * Deep-freezes the given object, but only in debug mode (and in browsers
 * that support it). This freeze is deep, and will automatically recurse
 * into object properties and freeze them. This implementation may return a copy
 * of the original object, and the return value should be used instead of the
 * original argument. This implementation only supports literal object
 * structures, and does not attempt to freeze classes, functions, etc.
 * @param arg The object to freeze.
 * @return A frozen object.
 */
export const deepFreeze: <T>(arg: T) => DeepFrozen<T>;

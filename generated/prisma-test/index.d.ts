
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Destinazione
 * 
 */
export type Destinazione = $Result.DefaultSelection<Prisma.$DestinazionePayload>
/**
 * Model Banca
 * 
 */
export type Banca = $Result.DefaultSelection<Prisma.$BancaPayload>
/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Fornitore
 * 
 */
export type Fornitore = $Result.DefaultSelection<Prisma.$FornitorePayload>
/**
 * Model Preventivo
 * 
 */
export type Preventivo = $Result.DefaultSelection<Prisma.$PreventivoPayload>
/**
 * Model ServiziATerra
 * 
 */
export type ServiziATerra = $Result.DefaultSelection<Prisma.$ServiziATerraPayload>
/**
 * Model Volo
 * 
 */
export type Volo = $Result.DefaultSelection<Prisma.$VoloPayload>
/**
 * Model Assicurazione
 * 
 */
export type Assicurazione = $Result.DefaultSelection<Prisma.$AssicurazionePayload>
/**
 * Model PreventivoAlCliente
 * 
 */
export type PreventivoAlCliente = $Result.DefaultSelection<Prisma.$PreventivoAlClientePayload>
/**
 * Model PreventivoAlClienteRow
 * 
 */
export type PreventivoAlClienteRow = $Result.DefaultSelection<Prisma.$PreventivoAlClienteRowPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.destinazione`: Exposes CRUD operations for the **Destinazione** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Destinaziones
    * const destinaziones = await prisma.destinazione.findMany()
    * ```
    */
  get destinazione(): Prisma.DestinazioneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.banca`: Exposes CRUD operations for the **Banca** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bancas
    * const bancas = await prisma.banca.findMany()
    * ```
    */
  get banca(): Prisma.BancaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fornitore`: Exposes CRUD operations for the **Fornitore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fornitores
    * const fornitores = await prisma.fornitore.findMany()
    * ```
    */
  get fornitore(): Prisma.FornitoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preventivo`: Exposes CRUD operations for the **Preventivo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Preventivos
    * const preventivos = await prisma.preventivo.findMany()
    * ```
    */
  get preventivo(): Prisma.PreventivoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviziATerra`: Exposes CRUD operations for the **ServiziATerra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiziATerras
    * const serviziATerras = await prisma.serviziATerra.findMany()
    * ```
    */
  get serviziATerra(): Prisma.ServiziATerraDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.volo`: Exposes CRUD operations for the **Volo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Volos
    * const volos = await prisma.volo.findMany()
    * ```
    */
  get volo(): Prisma.VoloDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assicurazione`: Exposes CRUD operations for the **Assicurazione** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assicuraziones
    * const assicuraziones = await prisma.assicurazione.findMany()
    * ```
    */
  get assicurazione(): Prisma.AssicurazioneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preventivoAlCliente`: Exposes CRUD operations for the **PreventivoAlCliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreventivoAlClientes
    * const preventivoAlClientes = await prisma.preventivoAlCliente.findMany()
    * ```
    */
  get preventivoAlCliente(): Prisma.PreventivoAlClienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preventivoAlClienteRow`: Exposes CRUD operations for the **PreventivoAlClienteRow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreventivoAlClienteRows
    * const preventivoAlClienteRows = await prisma.preventivoAlClienteRow.findMany()
    * ```
    */
  get preventivoAlClienteRow(): Prisma.PreventivoAlClienteRowDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Destinazione: 'Destinazione',
    Banca: 'Banca',
    Cliente: 'Cliente',
    Fornitore: 'Fornitore',
    Preventivo: 'Preventivo',
    ServiziATerra: 'ServiziATerra',
    Volo: 'Volo',
    Assicurazione: 'Assicurazione',
    PreventivoAlCliente: 'PreventivoAlCliente',
    PreventivoAlClienteRow: 'PreventivoAlClienteRow'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "destinazione" | "banca" | "cliente" | "fornitore" | "preventivo" | "serviziATerra" | "volo" | "assicurazione" | "preventivoAlCliente" | "preventivoAlClienteRow"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Destinazione: {
        payload: Prisma.$DestinazionePayload<ExtArgs>
        fields: Prisma.DestinazioneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DestinazioneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DestinazioneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>
          }
          findFirst: {
            args: Prisma.DestinazioneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DestinazioneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>
          }
          findMany: {
            args: Prisma.DestinazioneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>[]
          }
          create: {
            args: Prisma.DestinazioneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>
          }
          createMany: {
            args: Prisma.DestinazioneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DestinazioneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>[]
          }
          delete: {
            args: Prisma.DestinazioneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>
          }
          update: {
            args: Prisma.DestinazioneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>
          }
          deleteMany: {
            args: Prisma.DestinazioneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DestinazioneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DestinazioneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>[]
          }
          upsert: {
            args: Prisma.DestinazioneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DestinazionePayload>
          }
          aggregate: {
            args: Prisma.DestinazioneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDestinazione>
          }
          groupBy: {
            args: Prisma.DestinazioneGroupByArgs<ExtArgs>
            result: $Utils.Optional<DestinazioneGroupByOutputType>[]
          }
          count: {
            args: Prisma.DestinazioneCountArgs<ExtArgs>
            result: $Utils.Optional<DestinazioneCountAggregateOutputType> | number
          }
        }
      }
      Banca: {
        payload: Prisma.$BancaPayload<ExtArgs>
        fields: Prisma.BancaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BancaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BancaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>
          }
          findFirst: {
            args: Prisma.BancaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BancaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>
          }
          findMany: {
            args: Prisma.BancaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>[]
          }
          create: {
            args: Prisma.BancaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>
          }
          createMany: {
            args: Prisma.BancaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BancaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>[]
          }
          delete: {
            args: Prisma.BancaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>
          }
          update: {
            args: Prisma.BancaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>
          }
          deleteMany: {
            args: Prisma.BancaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BancaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BancaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>[]
          }
          upsert: {
            args: Prisma.BancaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BancaPayload>
          }
          aggregate: {
            args: Prisma.BancaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBanca>
          }
          groupBy: {
            args: Prisma.BancaGroupByArgs<ExtArgs>
            result: $Utils.Optional<BancaGroupByOutputType>[]
          }
          count: {
            args: Prisma.BancaCountArgs<ExtArgs>
            result: $Utils.Optional<BancaCountAggregateOutputType> | number
          }
        }
      }
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClienteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Fornitore: {
        payload: Prisma.$FornitorePayload<ExtArgs>
        fields: Prisma.FornitoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FornitoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FornitoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>
          }
          findFirst: {
            args: Prisma.FornitoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FornitoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>
          }
          findMany: {
            args: Prisma.FornitoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>[]
          }
          create: {
            args: Prisma.FornitoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>
          }
          createMany: {
            args: Prisma.FornitoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FornitoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>[]
          }
          delete: {
            args: Prisma.FornitoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>
          }
          update: {
            args: Prisma.FornitoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>
          }
          deleteMany: {
            args: Prisma.FornitoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FornitoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FornitoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>[]
          }
          upsert: {
            args: Prisma.FornitoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FornitorePayload>
          }
          aggregate: {
            args: Prisma.FornitoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFornitore>
          }
          groupBy: {
            args: Prisma.FornitoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<FornitoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.FornitoreCountArgs<ExtArgs>
            result: $Utils.Optional<FornitoreCountAggregateOutputType> | number
          }
        }
      }
      Preventivo: {
        payload: Prisma.$PreventivoPayload<ExtArgs>
        fields: Prisma.PreventivoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreventivoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreventivoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>
          }
          findFirst: {
            args: Prisma.PreventivoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreventivoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>
          }
          findMany: {
            args: Prisma.PreventivoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>[]
          }
          create: {
            args: Prisma.PreventivoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>
          }
          createMany: {
            args: Prisma.PreventivoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreventivoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>[]
          }
          delete: {
            args: Prisma.PreventivoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>
          }
          update: {
            args: Prisma.PreventivoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>
          }
          deleteMany: {
            args: Prisma.PreventivoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreventivoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreventivoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>[]
          }
          upsert: {
            args: Prisma.PreventivoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoPayload>
          }
          aggregate: {
            args: Prisma.PreventivoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreventivo>
          }
          groupBy: {
            args: Prisma.PreventivoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreventivoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreventivoCountArgs<ExtArgs>
            result: $Utils.Optional<PreventivoCountAggregateOutputType> | number
          }
        }
      }
      ServiziATerra: {
        payload: Prisma.$ServiziATerraPayload<ExtArgs>
        fields: Prisma.ServiziATerraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiziATerraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiziATerraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>
          }
          findFirst: {
            args: Prisma.ServiziATerraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiziATerraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>
          }
          findMany: {
            args: Prisma.ServiziATerraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>[]
          }
          create: {
            args: Prisma.ServiziATerraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>
          }
          createMany: {
            args: Prisma.ServiziATerraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiziATerraCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>[]
          }
          delete: {
            args: Prisma.ServiziATerraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>
          }
          update: {
            args: Prisma.ServiziATerraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>
          }
          deleteMany: {
            args: Prisma.ServiziATerraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiziATerraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiziATerraUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>[]
          }
          upsert: {
            args: Prisma.ServiziATerraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiziATerraPayload>
          }
          aggregate: {
            args: Prisma.ServiziATerraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiziATerra>
          }
          groupBy: {
            args: Prisma.ServiziATerraGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiziATerraGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiziATerraCountArgs<ExtArgs>
            result: $Utils.Optional<ServiziATerraCountAggregateOutputType> | number
          }
        }
      }
      Volo: {
        payload: Prisma.$VoloPayload<ExtArgs>
        fields: Prisma.VoloFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoloFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoloFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>
          }
          findFirst: {
            args: Prisma.VoloFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoloFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>
          }
          findMany: {
            args: Prisma.VoloFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>[]
          }
          create: {
            args: Prisma.VoloCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>
          }
          createMany: {
            args: Prisma.VoloCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoloCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>[]
          }
          delete: {
            args: Prisma.VoloDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>
          }
          update: {
            args: Prisma.VoloUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>
          }
          deleteMany: {
            args: Prisma.VoloDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoloUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoloUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>[]
          }
          upsert: {
            args: Prisma.VoloUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoloPayload>
          }
          aggregate: {
            args: Prisma.VoloAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVolo>
          }
          groupBy: {
            args: Prisma.VoloGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoloGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoloCountArgs<ExtArgs>
            result: $Utils.Optional<VoloCountAggregateOutputType> | number
          }
        }
      }
      Assicurazione: {
        payload: Prisma.$AssicurazionePayload<ExtArgs>
        fields: Prisma.AssicurazioneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssicurazioneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssicurazioneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>
          }
          findFirst: {
            args: Prisma.AssicurazioneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssicurazioneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>
          }
          findMany: {
            args: Prisma.AssicurazioneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>[]
          }
          create: {
            args: Prisma.AssicurazioneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>
          }
          createMany: {
            args: Prisma.AssicurazioneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssicurazioneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>[]
          }
          delete: {
            args: Prisma.AssicurazioneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>
          }
          update: {
            args: Prisma.AssicurazioneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>
          }
          deleteMany: {
            args: Prisma.AssicurazioneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssicurazioneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssicurazioneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>[]
          }
          upsert: {
            args: Prisma.AssicurazioneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssicurazionePayload>
          }
          aggregate: {
            args: Prisma.AssicurazioneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssicurazione>
          }
          groupBy: {
            args: Prisma.AssicurazioneGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssicurazioneGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssicurazioneCountArgs<ExtArgs>
            result: $Utils.Optional<AssicurazioneCountAggregateOutputType> | number
          }
        }
      }
      PreventivoAlCliente: {
        payload: Prisma.$PreventivoAlClientePayload<ExtArgs>
        fields: Prisma.PreventivoAlClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreventivoAlClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreventivoAlClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>
          }
          findFirst: {
            args: Prisma.PreventivoAlClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreventivoAlClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>
          }
          findMany: {
            args: Prisma.PreventivoAlClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>[]
          }
          create: {
            args: Prisma.PreventivoAlClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>
          }
          createMany: {
            args: Prisma.PreventivoAlClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreventivoAlClienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>[]
          }
          delete: {
            args: Prisma.PreventivoAlClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>
          }
          update: {
            args: Prisma.PreventivoAlClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>
          }
          deleteMany: {
            args: Prisma.PreventivoAlClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreventivoAlClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreventivoAlClienteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>[]
          }
          upsert: {
            args: Prisma.PreventivoAlClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClientePayload>
          }
          aggregate: {
            args: Prisma.PreventivoAlClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreventivoAlCliente>
          }
          groupBy: {
            args: Prisma.PreventivoAlClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreventivoAlClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreventivoAlClienteCountArgs<ExtArgs>
            result: $Utils.Optional<PreventivoAlClienteCountAggregateOutputType> | number
          }
        }
      }
      PreventivoAlClienteRow: {
        payload: Prisma.$PreventivoAlClienteRowPayload<ExtArgs>
        fields: Prisma.PreventivoAlClienteRowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreventivoAlClienteRowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreventivoAlClienteRowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>
          }
          findFirst: {
            args: Prisma.PreventivoAlClienteRowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreventivoAlClienteRowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>
          }
          findMany: {
            args: Prisma.PreventivoAlClienteRowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>[]
          }
          create: {
            args: Prisma.PreventivoAlClienteRowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>
          }
          createMany: {
            args: Prisma.PreventivoAlClienteRowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreventivoAlClienteRowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>[]
          }
          delete: {
            args: Prisma.PreventivoAlClienteRowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>
          }
          update: {
            args: Prisma.PreventivoAlClienteRowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>
          }
          deleteMany: {
            args: Prisma.PreventivoAlClienteRowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreventivoAlClienteRowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreventivoAlClienteRowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>[]
          }
          upsert: {
            args: Prisma.PreventivoAlClienteRowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreventivoAlClienteRowPayload>
          }
          aggregate: {
            args: Prisma.PreventivoAlClienteRowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreventivoAlClienteRow>
          }
          groupBy: {
            args: Prisma.PreventivoAlClienteRowGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreventivoAlClienteRowGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreventivoAlClienteRowCountArgs<ExtArgs>
            result: $Utils.Optional<PreventivoAlClienteRowCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    destinazione?: DestinazioneOmit
    banca?: BancaOmit
    cliente?: ClienteOmit
    fornitore?: FornitoreOmit
    preventivo?: PreventivoOmit
    serviziATerra?: ServiziATerraOmit
    volo?: VoloOmit
    assicurazione?: AssicurazioneOmit
    preventivoAlCliente?: PreventivoAlClienteOmit
    preventivoAlClienteRow?: PreventivoAlClienteRowOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DestinazioneCountOutputType
   */

  export type DestinazioneCountOutputType = {
    serviziATerra: number
  }

  export type DestinazioneCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviziATerra?: boolean | DestinazioneCountOutputTypeCountServiziATerraArgs
  }

  // Custom InputTypes
  /**
   * DestinazioneCountOutputType without action
   */
  export type DestinazioneCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DestinazioneCountOutputType
     */
    select?: DestinazioneCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DestinazioneCountOutputType without action
   */
  export type DestinazioneCountOutputTypeCountServiziATerraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiziATerraWhereInput
  }


  /**
   * Count Type ClienteCountOutputType
   */

  export type ClienteCountOutputType = {
    preventivi: number
  }

  export type ClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivi?: boolean | ClienteCountOutputTypeCountPreventiviArgs
  }

  // Custom InputTypes
  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClienteCountOutputType
     */
    select?: ClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountPreventiviArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreventivoWhereInput
  }


  /**
   * Count Type FornitoreCountOutputType
   */

  export type FornitoreCountOutputType = {
    serviziATerra: number
    voli: number
    assicurazioni: number
  }

  export type FornitoreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviziATerra?: boolean | FornitoreCountOutputTypeCountServiziATerraArgs
    voli?: boolean | FornitoreCountOutputTypeCountVoliArgs
    assicurazioni?: boolean | FornitoreCountOutputTypeCountAssicurazioniArgs
  }

  // Custom InputTypes
  /**
   * FornitoreCountOutputType without action
   */
  export type FornitoreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FornitoreCountOutputType
     */
    select?: FornitoreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FornitoreCountOutputType without action
   */
  export type FornitoreCountOutputTypeCountServiziATerraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiziATerraWhereInput
  }

  /**
   * FornitoreCountOutputType without action
   */
  export type FornitoreCountOutputTypeCountVoliArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoloWhereInput
  }

  /**
   * FornitoreCountOutputType without action
   */
  export type FornitoreCountOutputTypeCountAssicurazioniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssicurazioneWhereInput
  }


  /**
   * Count Type PreventivoCountOutputType
   */

  export type PreventivoCountOutputType = {
    serviziATerra: number
    voli: number
    assicurazioni: number
    preventiviAlCliente: number
  }

  export type PreventivoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviziATerra?: boolean | PreventivoCountOutputTypeCountServiziATerraArgs
    voli?: boolean | PreventivoCountOutputTypeCountVoliArgs
    assicurazioni?: boolean | PreventivoCountOutputTypeCountAssicurazioniArgs
    preventiviAlCliente?: boolean | PreventivoCountOutputTypeCountPreventiviAlClienteArgs
  }

  // Custom InputTypes
  /**
   * PreventivoCountOutputType without action
   */
  export type PreventivoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoCountOutputType
     */
    select?: PreventivoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PreventivoCountOutputType without action
   */
  export type PreventivoCountOutputTypeCountServiziATerraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiziATerraWhereInput
  }

  /**
   * PreventivoCountOutputType without action
   */
  export type PreventivoCountOutputTypeCountVoliArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoloWhereInput
  }

  /**
   * PreventivoCountOutputType without action
   */
  export type PreventivoCountOutputTypeCountAssicurazioniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssicurazioneWhereInput
  }

  /**
   * PreventivoCountOutputType without action
   */
  export type PreventivoCountOutputTypeCountPreventiviAlClienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreventivoAlClienteWhereInput
  }


  /**
   * Count Type PreventivoAlClienteCountOutputType
   */

  export type PreventivoAlClienteCountOutputType = {
    rows: number
  }

  export type PreventivoAlClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rows?: boolean | PreventivoAlClienteCountOutputTypeCountRowsArgs
  }

  // Custom InputTypes
  /**
   * PreventivoAlClienteCountOutputType without action
   */
  export type PreventivoAlClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteCountOutputType
     */
    select?: PreventivoAlClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PreventivoAlClienteCountOutputType without action
   */
  export type PreventivoAlClienteCountOutputTypeCountRowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreventivoAlClienteRowWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Destinazione
   */

  export type AggregateDestinazione = {
    _count: DestinazioneCountAggregateOutputType | null
    _min: DestinazioneMinAggregateOutputType | null
    _max: DestinazioneMaxAggregateOutputType | null
  }

  export type DestinazioneMinAggregateOutputType = {
    id: string | null
    nome: string | null
  }

  export type DestinazioneMaxAggregateOutputType = {
    id: string | null
    nome: string | null
  }

  export type DestinazioneCountAggregateOutputType = {
    id: number
    nome: number
    _all: number
  }


  export type DestinazioneMinAggregateInputType = {
    id?: true
    nome?: true
  }

  export type DestinazioneMaxAggregateInputType = {
    id?: true
    nome?: true
  }

  export type DestinazioneCountAggregateInputType = {
    id?: true
    nome?: true
    _all?: true
  }

  export type DestinazioneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Destinazione to aggregate.
     */
    where?: DestinazioneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Destinaziones to fetch.
     */
    orderBy?: DestinazioneOrderByWithRelationInput | DestinazioneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DestinazioneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Destinaziones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Destinaziones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Destinaziones
    **/
    _count?: true | DestinazioneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DestinazioneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DestinazioneMaxAggregateInputType
  }

  export type GetDestinazioneAggregateType<T extends DestinazioneAggregateArgs> = {
        [P in keyof T & keyof AggregateDestinazione]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDestinazione[P]>
      : GetScalarType<T[P], AggregateDestinazione[P]>
  }




  export type DestinazioneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DestinazioneWhereInput
    orderBy?: DestinazioneOrderByWithAggregationInput | DestinazioneOrderByWithAggregationInput[]
    by: DestinazioneScalarFieldEnum[] | DestinazioneScalarFieldEnum
    having?: DestinazioneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DestinazioneCountAggregateInputType | true
    _min?: DestinazioneMinAggregateInputType
    _max?: DestinazioneMaxAggregateInputType
  }

  export type DestinazioneGroupByOutputType = {
    id: string
    nome: string
    _count: DestinazioneCountAggregateOutputType | null
    _min: DestinazioneMinAggregateOutputType | null
    _max: DestinazioneMaxAggregateOutputType | null
  }

  type GetDestinazioneGroupByPayload<T extends DestinazioneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DestinazioneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DestinazioneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DestinazioneGroupByOutputType[P]>
            : GetScalarType<T[P], DestinazioneGroupByOutputType[P]>
        }
      >
    >


  export type DestinazioneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    serviziATerra?: boolean | Destinazione$serviziATerraArgs<ExtArgs>
    _count?: boolean | DestinazioneCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["destinazione"]>

  export type DestinazioneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
  }, ExtArgs["result"]["destinazione"]>

  export type DestinazioneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
  }, ExtArgs["result"]["destinazione"]>

  export type DestinazioneSelectScalar = {
    id?: boolean
    nome?: boolean
  }

  export type DestinazioneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome", ExtArgs["result"]["destinazione"]>
  export type DestinazioneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviziATerra?: boolean | Destinazione$serviziATerraArgs<ExtArgs>
    _count?: boolean | DestinazioneCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DestinazioneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DestinazioneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DestinazionePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Destinazione"
    objects: {
      serviziATerra: Prisma.$ServiziATerraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
    }, ExtArgs["result"]["destinazione"]>
    composites: {}
  }

  type DestinazioneGetPayload<S extends boolean | null | undefined | DestinazioneDefaultArgs> = $Result.GetResult<Prisma.$DestinazionePayload, S>

  type DestinazioneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DestinazioneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DestinazioneCountAggregateInputType | true
    }

  export interface DestinazioneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Destinazione'], meta: { name: 'Destinazione' } }
    /**
     * Find zero or one Destinazione that matches the filter.
     * @param {DestinazioneFindUniqueArgs} args - Arguments to find a Destinazione
     * @example
     * // Get one Destinazione
     * const destinazione = await prisma.destinazione.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DestinazioneFindUniqueArgs>(args: SelectSubset<T, DestinazioneFindUniqueArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Destinazione that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DestinazioneFindUniqueOrThrowArgs} args - Arguments to find a Destinazione
     * @example
     * // Get one Destinazione
     * const destinazione = await prisma.destinazione.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DestinazioneFindUniqueOrThrowArgs>(args: SelectSubset<T, DestinazioneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Destinazione that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinazioneFindFirstArgs} args - Arguments to find a Destinazione
     * @example
     * // Get one Destinazione
     * const destinazione = await prisma.destinazione.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DestinazioneFindFirstArgs>(args?: SelectSubset<T, DestinazioneFindFirstArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Destinazione that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinazioneFindFirstOrThrowArgs} args - Arguments to find a Destinazione
     * @example
     * // Get one Destinazione
     * const destinazione = await prisma.destinazione.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DestinazioneFindFirstOrThrowArgs>(args?: SelectSubset<T, DestinazioneFindFirstOrThrowArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Destinaziones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinazioneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Destinaziones
     * const destinaziones = await prisma.destinazione.findMany()
     * 
     * // Get first 10 Destinaziones
     * const destinaziones = await prisma.destinazione.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const destinazioneWithIdOnly = await prisma.destinazione.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DestinazioneFindManyArgs>(args?: SelectSubset<T, DestinazioneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Destinazione.
     * @param {DestinazioneCreateArgs} args - Arguments to create a Destinazione.
     * @example
     * // Create one Destinazione
     * const Destinazione = await prisma.destinazione.create({
     *   data: {
     *     // ... data to create a Destinazione
     *   }
     * })
     * 
     */
    create<T extends DestinazioneCreateArgs>(args: SelectSubset<T, DestinazioneCreateArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Destinaziones.
     * @param {DestinazioneCreateManyArgs} args - Arguments to create many Destinaziones.
     * @example
     * // Create many Destinaziones
     * const destinazione = await prisma.destinazione.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DestinazioneCreateManyArgs>(args?: SelectSubset<T, DestinazioneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Destinaziones and returns the data saved in the database.
     * @param {DestinazioneCreateManyAndReturnArgs} args - Arguments to create many Destinaziones.
     * @example
     * // Create many Destinaziones
     * const destinazione = await prisma.destinazione.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Destinaziones and only return the `id`
     * const destinazioneWithIdOnly = await prisma.destinazione.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DestinazioneCreateManyAndReturnArgs>(args?: SelectSubset<T, DestinazioneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Destinazione.
     * @param {DestinazioneDeleteArgs} args - Arguments to delete one Destinazione.
     * @example
     * // Delete one Destinazione
     * const Destinazione = await prisma.destinazione.delete({
     *   where: {
     *     // ... filter to delete one Destinazione
     *   }
     * })
     * 
     */
    delete<T extends DestinazioneDeleteArgs>(args: SelectSubset<T, DestinazioneDeleteArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Destinazione.
     * @param {DestinazioneUpdateArgs} args - Arguments to update one Destinazione.
     * @example
     * // Update one Destinazione
     * const destinazione = await prisma.destinazione.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DestinazioneUpdateArgs>(args: SelectSubset<T, DestinazioneUpdateArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Destinaziones.
     * @param {DestinazioneDeleteManyArgs} args - Arguments to filter Destinaziones to delete.
     * @example
     * // Delete a few Destinaziones
     * const { count } = await prisma.destinazione.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DestinazioneDeleteManyArgs>(args?: SelectSubset<T, DestinazioneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Destinaziones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinazioneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Destinaziones
     * const destinazione = await prisma.destinazione.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DestinazioneUpdateManyArgs>(args: SelectSubset<T, DestinazioneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Destinaziones and returns the data updated in the database.
     * @param {DestinazioneUpdateManyAndReturnArgs} args - Arguments to update many Destinaziones.
     * @example
     * // Update many Destinaziones
     * const destinazione = await prisma.destinazione.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Destinaziones and only return the `id`
     * const destinazioneWithIdOnly = await prisma.destinazione.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DestinazioneUpdateManyAndReturnArgs>(args: SelectSubset<T, DestinazioneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Destinazione.
     * @param {DestinazioneUpsertArgs} args - Arguments to update or create a Destinazione.
     * @example
     * // Update or create a Destinazione
     * const destinazione = await prisma.destinazione.upsert({
     *   create: {
     *     // ... data to create a Destinazione
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Destinazione we want to update
     *   }
     * })
     */
    upsert<T extends DestinazioneUpsertArgs>(args: SelectSubset<T, DestinazioneUpsertArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Destinaziones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinazioneCountArgs} args - Arguments to filter Destinaziones to count.
     * @example
     * // Count the number of Destinaziones
     * const count = await prisma.destinazione.count({
     *   where: {
     *     // ... the filter for the Destinaziones we want to count
     *   }
     * })
    **/
    count<T extends DestinazioneCountArgs>(
      args?: Subset<T, DestinazioneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DestinazioneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Destinazione.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinazioneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DestinazioneAggregateArgs>(args: Subset<T, DestinazioneAggregateArgs>): Prisma.PrismaPromise<GetDestinazioneAggregateType<T>>

    /**
     * Group by Destinazione.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DestinazioneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DestinazioneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DestinazioneGroupByArgs['orderBy'] }
        : { orderBy?: DestinazioneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DestinazioneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDestinazioneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Destinazione model
   */
  readonly fields: DestinazioneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Destinazione.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DestinazioneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviziATerra<T extends Destinazione$serviziATerraArgs<ExtArgs> = {}>(args?: Subset<T, Destinazione$serviziATerraArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Destinazione model
   */
  interface DestinazioneFieldRefs {
    readonly id: FieldRef<"Destinazione", 'String'>
    readonly nome: FieldRef<"Destinazione", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Destinazione findUnique
   */
  export type DestinazioneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * Filter, which Destinazione to fetch.
     */
    where: DestinazioneWhereUniqueInput
  }

  /**
   * Destinazione findUniqueOrThrow
   */
  export type DestinazioneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * Filter, which Destinazione to fetch.
     */
    where: DestinazioneWhereUniqueInput
  }

  /**
   * Destinazione findFirst
   */
  export type DestinazioneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * Filter, which Destinazione to fetch.
     */
    where?: DestinazioneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Destinaziones to fetch.
     */
    orderBy?: DestinazioneOrderByWithRelationInput | DestinazioneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Destinaziones.
     */
    cursor?: DestinazioneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Destinaziones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Destinaziones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Destinaziones.
     */
    distinct?: DestinazioneScalarFieldEnum | DestinazioneScalarFieldEnum[]
  }

  /**
   * Destinazione findFirstOrThrow
   */
  export type DestinazioneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * Filter, which Destinazione to fetch.
     */
    where?: DestinazioneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Destinaziones to fetch.
     */
    orderBy?: DestinazioneOrderByWithRelationInput | DestinazioneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Destinaziones.
     */
    cursor?: DestinazioneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Destinaziones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Destinaziones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Destinaziones.
     */
    distinct?: DestinazioneScalarFieldEnum | DestinazioneScalarFieldEnum[]
  }

  /**
   * Destinazione findMany
   */
  export type DestinazioneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * Filter, which Destinaziones to fetch.
     */
    where?: DestinazioneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Destinaziones to fetch.
     */
    orderBy?: DestinazioneOrderByWithRelationInput | DestinazioneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Destinaziones.
     */
    cursor?: DestinazioneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Destinaziones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Destinaziones.
     */
    skip?: number
    distinct?: DestinazioneScalarFieldEnum | DestinazioneScalarFieldEnum[]
  }

  /**
   * Destinazione create
   */
  export type DestinazioneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * The data needed to create a Destinazione.
     */
    data: XOR<DestinazioneCreateInput, DestinazioneUncheckedCreateInput>
  }

  /**
   * Destinazione createMany
   */
  export type DestinazioneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Destinaziones.
     */
    data: DestinazioneCreateManyInput | DestinazioneCreateManyInput[]
  }

  /**
   * Destinazione createManyAndReturn
   */
  export type DestinazioneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * The data used to create many Destinaziones.
     */
    data: DestinazioneCreateManyInput | DestinazioneCreateManyInput[]
  }

  /**
   * Destinazione update
   */
  export type DestinazioneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * The data needed to update a Destinazione.
     */
    data: XOR<DestinazioneUpdateInput, DestinazioneUncheckedUpdateInput>
    /**
     * Choose, which Destinazione to update.
     */
    where: DestinazioneWhereUniqueInput
  }

  /**
   * Destinazione updateMany
   */
  export type DestinazioneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Destinaziones.
     */
    data: XOR<DestinazioneUpdateManyMutationInput, DestinazioneUncheckedUpdateManyInput>
    /**
     * Filter which Destinaziones to update
     */
    where?: DestinazioneWhereInput
    /**
     * Limit how many Destinaziones to update.
     */
    limit?: number
  }

  /**
   * Destinazione updateManyAndReturn
   */
  export type DestinazioneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * The data used to update Destinaziones.
     */
    data: XOR<DestinazioneUpdateManyMutationInput, DestinazioneUncheckedUpdateManyInput>
    /**
     * Filter which Destinaziones to update
     */
    where?: DestinazioneWhereInput
    /**
     * Limit how many Destinaziones to update.
     */
    limit?: number
  }

  /**
   * Destinazione upsert
   */
  export type DestinazioneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * The filter to search for the Destinazione to update in case it exists.
     */
    where: DestinazioneWhereUniqueInput
    /**
     * In case the Destinazione found by the `where` argument doesn't exist, create a new Destinazione with this data.
     */
    create: XOR<DestinazioneCreateInput, DestinazioneUncheckedCreateInput>
    /**
     * In case the Destinazione was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DestinazioneUpdateInput, DestinazioneUncheckedUpdateInput>
  }

  /**
   * Destinazione delete
   */
  export type DestinazioneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    /**
     * Filter which Destinazione to delete.
     */
    where: DestinazioneWhereUniqueInput
  }

  /**
   * Destinazione deleteMany
   */
  export type DestinazioneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Destinaziones to delete
     */
    where?: DestinazioneWhereInput
    /**
     * Limit how many Destinaziones to delete.
     */
    limit?: number
  }

  /**
   * Destinazione.serviziATerra
   */
  export type Destinazione$serviziATerraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    where?: ServiziATerraWhereInput
    orderBy?: ServiziATerraOrderByWithRelationInput | ServiziATerraOrderByWithRelationInput[]
    cursor?: ServiziATerraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiziATerraScalarFieldEnum | ServiziATerraScalarFieldEnum[]
  }

  /**
   * Destinazione without action
   */
  export type DestinazioneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
  }


  /**
   * Model Banca
   */

  export type AggregateBanca = {
    _count: BancaCountAggregateOutputType | null
    _min: BancaMinAggregateOutputType | null
    _max: BancaMaxAggregateOutputType | null
  }

  export type BancaMinAggregateOutputType = {
    id: string | null
    nome: string | null
  }

  export type BancaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
  }

  export type BancaCountAggregateOutputType = {
    id: number
    nome: number
    _all: number
  }


  export type BancaMinAggregateInputType = {
    id?: true
    nome?: true
  }

  export type BancaMaxAggregateInputType = {
    id?: true
    nome?: true
  }

  export type BancaCountAggregateInputType = {
    id?: true
    nome?: true
    _all?: true
  }

  export type BancaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Banca to aggregate.
     */
    where?: BancaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bancas to fetch.
     */
    orderBy?: BancaOrderByWithRelationInput | BancaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BancaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bancas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bancas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bancas
    **/
    _count?: true | BancaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BancaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BancaMaxAggregateInputType
  }

  export type GetBancaAggregateType<T extends BancaAggregateArgs> = {
        [P in keyof T & keyof AggregateBanca]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBanca[P]>
      : GetScalarType<T[P], AggregateBanca[P]>
  }




  export type BancaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BancaWhereInput
    orderBy?: BancaOrderByWithAggregationInput | BancaOrderByWithAggregationInput[]
    by: BancaScalarFieldEnum[] | BancaScalarFieldEnum
    having?: BancaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BancaCountAggregateInputType | true
    _min?: BancaMinAggregateInputType
    _max?: BancaMaxAggregateInputType
  }

  export type BancaGroupByOutputType = {
    id: string
    nome: string
    _count: BancaCountAggregateOutputType | null
    _min: BancaMinAggregateOutputType | null
    _max: BancaMaxAggregateOutputType | null
  }

  type GetBancaGroupByPayload<T extends BancaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BancaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BancaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BancaGroupByOutputType[P]>
            : GetScalarType<T[P], BancaGroupByOutputType[P]>
        }
      >
    >


  export type BancaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
  }, ExtArgs["result"]["banca"]>

  export type BancaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
  }, ExtArgs["result"]["banca"]>

  export type BancaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
  }, ExtArgs["result"]["banca"]>

  export type BancaSelectScalar = {
    id?: boolean
    nome?: boolean
  }

  export type BancaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome", ExtArgs["result"]["banca"]>

  export type $BancaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Banca"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
    }, ExtArgs["result"]["banca"]>
    composites: {}
  }

  type BancaGetPayload<S extends boolean | null | undefined | BancaDefaultArgs> = $Result.GetResult<Prisma.$BancaPayload, S>

  type BancaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BancaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BancaCountAggregateInputType | true
    }

  export interface BancaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Banca'], meta: { name: 'Banca' } }
    /**
     * Find zero or one Banca that matches the filter.
     * @param {BancaFindUniqueArgs} args - Arguments to find a Banca
     * @example
     * // Get one Banca
     * const banca = await prisma.banca.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BancaFindUniqueArgs>(args: SelectSubset<T, BancaFindUniqueArgs<ExtArgs>>): Prisma__BancaClient<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Banca that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BancaFindUniqueOrThrowArgs} args - Arguments to find a Banca
     * @example
     * // Get one Banca
     * const banca = await prisma.banca.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BancaFindUniqueOrThrowArgs>(args: SelectSubset<T, BancaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BancaClient<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Banca that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BancaFindFirstArgs} args - Arguments to find a Banca
     * @example
     * // Get one Banca
     * const banca = await prisma.banca.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BancaFindFirstArgs>(args?: SelectSubset<T, BancaFindFirstArgs<ExtArgs>>): Prisma__BancaClient<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Banca that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BancaFindFirstOrThrowArgs} args - Arguments to find a Banca
     * @example
     * // Get one Banca
     * const banca = await prisma.banca.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BancaFindFirstOrThrowArgs>(args?: SelectSubset<T, BancaFindFirstOrThrowArgs<ExtArgs>>): Prisma__BancaClient<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bancas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BancaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bancas
     * const bancas = await prisma.banca.findMany()
     * 
     * // Get first 10 Bancas
     * const bancas = await prisma.banca.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bancaWithIdOnly = await prisma.banca.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BancaFindManyArgs>(args?: SelectSubset<T, BancaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Banca.
     * @param {BancaCreateArgs} args - Arguments to create a Banca.
     * @example
     * // Create one Banca
     * const Banca = await prisma.banca.create({
     *   data: {
     *     // ... data to create a Banca
     *   }
     * })
     * 
     */
    create<T extends BancaCreateArgs>(args: SelectSubset<T, BancaCreateArgs<ExtArgs>>): Prisma__BancaClient<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bancas.
     * @param {BancaCreateManyArgs} args - Arguments to create many Bancas.
     * @example
     * // Create many Bancas
     * const banca = await prisma.banca.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BancaCreateManyArgs>(args?: SelectSubset<T, BancaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bancas and returns the data saved in the database.
     * @param {BancaCreateManyAndReturnArgs} args - Arguments to create many Bancas.
     * @example
     * // Create many Bancas
     * const banca = await prisma.banca.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bancas and only return the `id`
     * const bancaWithIdOnly = await prisma.banca.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BancaCreateManyAndReturnArgs>(args?: SelectSubset<T, BancaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Banca.
     * @param {BancaDeleteArgs} args - Arguments to delete one Banca.
     * @example
     * // Delete one Banca
     * const Banca = await prisma.banca.delete({
     *   where: {
     *     // ... filter to delete one Banca
     *   }
     * })
     * 
     */
    delete<T extends BancaDeleteArgs>(args: SelectSubset<T, BancaDeleteArgs<ExtArgs>>): Prisma__BancaClient<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Banca.
     * @param {BancaUpdateArgs} args - Arguments to update one Banca.
     * @example
     * // Update one Banca
     * const banca = await prisma.banca.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BancaUpdateArgs>(args: SelectSubset<T, BancaUpdateArgs<ExtArgs>>): Prisma__BancaClient<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bancas.
     * @param {BancaDeleteManyArgs} args - Arguments to filter Bancas to delete.
     * @example
     * // Delete a few Bancas
     * const { count } = await prisma.banca.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BancaDeleteManyArgs>(args?: SelectSubset<T, BancaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bancas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BancaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bancas
     * const banca = await prisma.banca.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BancaUpdateManyArgs>(args: SelectSubset<T, BancaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bancas and returns the data updated in the database.
     * @param {BancaUpdateManyAndReturnArgs} args - Arguments to update many Bancas.
     * @example
     * // Update many Bancas
     * const banca = await prisma.banca.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bancas and only return the `id`
     * const bancaWithIdOnly = await prisma.banca.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BancaUpdateManyAndReturnArgs>(args: SelectSubset<T, BancaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Banca.
     * @param {BancaUpsertArgs} args - Arguments to update or create a Banca.
     * @example
     * // Update or create a Banca
     * const banca = await prisma.banca.upsert({
     *   create: {
     *     // ... data to create a Banca
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Banca we want to update
     *   }
     * })
     */
    upsert<T extends BancaUpsertArgs>(args: SelectSubset<T, BancaUpsertArgs<ExtArgs>>): Prisma__BancaClient<$Result.GetResult<Prisma.$BancaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bancas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BancaCountArgs} args - Arguments to filter Bancas to count.
     * @example
     * // Count the number of Bancas
     * const count = await prisma.banca.count({
     *   where: {
     *     // ... the filter for the Bancas we want to count
     *   }
     * })
    **/
    count<T extends BancaCountArgs>(
      args?: Subset<T, BancaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BancaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Banca.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BancaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BancaAggregateArgs>(args: Subset<T, BancaAggregateArgs>): Prisma.PrismaPromise<GetBancaAggregateType<T>>

    /**
     * Group by Banca.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BancaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BancaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BancaGroupByArgs['orderBy'] }
        : { orderBy?: BancaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BancaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBancaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Banca model
   */
  readonly fields: BancaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Banca.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BancaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Banca model
   */
  interface BancaFieldRefs {
    readonly id: FieldRef<"Banca", 'String'>
    readonly nome: FieldRef<"Banca", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Banca findUnique
   */
  export type BancaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * Filter, which Banca to fetch.
     */
    where: BancaWhereUniqueInput
  }

  /**
   * Banca findUniqueOrThrow
   */
  export type BancaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * Filter, which Banca to fetch.
     */
    where: BancaWhereUniqueInput
  }

  /**
   * Banca findFirst
   */
  export type BancaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * Filter, which Banca to fetch.
     */
    where?: BancaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bancas to fetch.
     */
    orderBy?: BancaOrderByWithRelationInput | BancaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bancas.
     */
    cursor?: BancaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bancas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bancas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bancas.
     */
    distinct?: BancaScalarFieldEnum | BancaScalarFieldEnum[]
  }

  /**
   * Banca findFirstOrThrow
   */
  export type BancaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * Filter, which Banca to fetch.
     */
    where?: BancaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bancas to fetch.
     */
    orderBy?: BancaOrderByWithRelationInput | BancaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bancas.
     */
    cursor?: BancaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bancas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bancas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bancas.
     */
    distinct?: BancaScalarFieldEnum | BancaScalarFieldEnum[]
  }

  /**
   * Banca findMany
   */
  export type BancaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * Filter, which Bancas to fetch.
     */
    where?: BancaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bancas to fetch.
     */
    orderBy?: BancaOrderByWithRelationInput | BancaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bancas.
     */
    cursor?: BancaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bancas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bancas.
     */
    skip?: number
    distinct?: BancaScalarFieldEnum | BancaScalarFieldEnum[]
  }

  /**
   * Banca create
   */
  export type BancaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * The data needed to create a Banca.
     */
    data: XOR<BancaCreateInput, BancaUncheckedCreateInput>
  }

  /**
   * Banca createMany
   */
  export type BancaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bancas.
     */
    data: BancaCreateManyInput | BancaCreateManyInput[]
  }

  /**
   * Banca createManyAndReturn
   */
  export type BancaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * The data used to create many Bancas.
     */
    data: BancaCreateManyInput | BancaCreateManyInput[]
  }

  /**
   * Banca update
   */
  export type BancaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * The data needed to update a Banca.
     */
    data: XOR<BancaUpdateInput, BancaUncheckedUpdateInput>
    /**
     * Choose, which Banca to update.
     */
    where: BancaWhereUniqueInput
  }

  /**
   * Banca updateMany
   */
  export type BancaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bancas.
     */
    data: XOR<BancaUpdateManyMutationInput, BancaUncheckedUpdateManyInput>
    /**
     * Filter which Bancas to update
     */
    where?: BancaWhereInput
    /**
     * Limit how many Bancas to update.
     */
    limit?: number
  }

  /**
   * Banca updateManyAndReturn
   */
  export type BancaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * The data used to update Bancas.
     */
    data: XOR<BancaUpdateManyMutationInput, BancaUncheckedUpdateManyInput>
    /**
     * Filter which Bancas to update
     */
    where?: BancaWhereInput
    /**
     * Limit how many Bancas to update.
     */
    limit?: number
  }

  /**
   * Banca upsert
   */
  export type BancaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * The filter to search for the Banca to update in case it exists.
     */
    where: BancaWhereUniqueInput
    /**
     * In case the Banca found by the `where` argument doesn't exist, create a new Banca with this data.
     */
    create: XOR<BancaCreateInput, BancaUncheckedCreateInput>
    /**
     * In case the Banca was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BancaUpdateInput, BancaUncheckedUpdateInput>
  }

  /**
   * Banca delete
   */
  export type BancaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
    /**
     * Filter which Banca to delete.
     */
    where: BancaWhereUniqueInput
  }

  /**
   * Banca deleteMany
   */
  export type BancaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bancas to delete
     */
    where?: BancaWhereInput
    /**
     * Limit how many Bancas to delete.
     */
    limit?: number
  }

  /**
   * Banca without action
   */
  export type BancaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Banca
     */
    select?: BancaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Banca
     */
    omit?: BancaOmit<ExtArgs> | null
  }


  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteMinAggregateOutputType = {
    id: string | null
    nome: string | null
    cognome: string | null
    tel: string | null
    indirizzo: string | null
    CAP: string | null
    citta: string | null
    CF: string | null
    email: string | null
    tipo: string | null
    provenienza: string | null
    collegato: string | null
    note: string | null
    data_di_nascita: Date | null
    luogo_nascita: string | null
    provincia_nascita: string | null
    numero_passaporto: string | null
    data_scadenza_passaporto: Date | null
    nazionalita: string | null
    provincia: string | null
    sesso: string | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    cognome: string | null
    tel: string | null
    indirizzo: string | null
    CAP: string | null
    citta: string | null
    CF: string | null
    email: string | null
    tipo: string | null
    provenienza: string | null
    collegato: string | null
    note: string | null
    data_di_nascita: Date | null
    luogo_nascita: string | null
    provincia_nascita: string | null
    numero_passaporto: string | null
    data_scadenza_passaporto: Date | null
    nazionalita: string | null
    provincia: string | null
    sesso: string | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    nome: number
    cognome: number
    tel: number
    indirizzo: number
    CAP: number
    citta: number
    CF: number
    email: number
    tipo: number
    provenienza: number
    collegato: number
    note: number
    data_di_nascita: number
    luogo_nascita: number
    provincia_nascita: number
    numero_passaporto: number
    data_scadenza_passaporto: number
    nazionalita: number
    provincia: number
    sesso: number
    _all: number
  }


  export type ClienteMinAggregateInputType = {
    id?: true
    nome?: true
    cognome?: true
    tel?: true
    indirizzo?: true
    CAP?: true
    citta?: true
    CF?: true
    email?: true
    tipo?: true
    provenienza?: true
    collegato?: true
    note?: true
    data_di_nascita?: true
    luogo_nascita?: true
    provincia_nascita?: true
    numero_passaporto?: true
    data_scadenza_passaporto?: true
    nazionalita?: true
    provincia?: true
    sesso?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    nome?: true
    cognome?: true
    tel?: true
    indirizzo?: true
    CAP?: true
    citta?: true
    CF?: true
    email?: true
    tipo?: true
    provenienza?: true
    collegato?: true
    note?: true
    data_di_nascita?: true
    luogo_nascita?: true
    provincia_nascita?: true
    numero_passaporto?: true
    data_scadenza_passaporto?: true
    nazionalita?: true
    provincia?: true
    sesso?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    nome?: true
    cognome?: true
    tel?: true
    indirizzo?: true
    CAP?: true
    citta?: true
    CF?: true
    email?: true
    tipo?: true
    provenienza?: true
    collegato?: true
    note?: true
    data_di_nascita?: true
    luogo_nascita?: true
    provincia_nascita?: true
    numero_passaporto?: true
    data_scadenza_passaporto?: true
    nazionalita?: true
    provincia?: true
    sesso?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: string
    nome: string | null
    cognome: string | null
    tel: string | null
    indirizzo: string | null
    CAP: string | null
    citta: string | null
    CF: string | null
    email: string
    tipo: string | null
    provenienza: string | null
    collegato: string | null
    note: string | null
    data_di_nascita: Date | null
    luogo_nascita: string | null
    provincia_nascita: string | null
    numero_passaporto: string | null
    data_scadenza_passaporto: Date | null
    nazionalita: string | null
    provincia: string | null
    sesso: string | null
    _count: ClienteCountAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cognome?: boolean
    tel?: boolean
    indirizzo?: boolean
    CAP?: boolean
    citta?: boolean
    CF?: boolean
    email?: boolean
    tipo?: boolean
    provenienza?: boolean
    collegato?: boolean
    note?: boolean
    data_di_nascita?: boolean
    luogo_nascita?: boolean
    provincia_nascita?: boolean
    numero_passaporto?: boolean
    data_scadenza_passaporto?: boolean
    nazionalita?: boolean
    provincia?: boolean
    sesso?: boolean
    preventivi?: boolean | Cliente$preventiviArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cognome?: boolean
    tel?: boolean
    indirizzo?: boolean
    CAP?: boolean
    citta?: boolean
    CF?: boolean
    email?: boolean
    tipo?: boolean
    provenienza?: boolean
    collegato?: boolean
    note?: boolean
    data_di_nascita?: boolean
    luogo_nascita?: boolean
    provincia_nascita?: boolean
    numero_passaporto?: boolean
    data_scadenza_passaporto?: boolean
    nazionalita?: boolean
    provincia?: boolean
    sesso?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cognome?: boolean
    tel?: boolean
    indirizzo?: boolean
    CAP?: boolean
    citta?: boolean
    CF?: boolean
    email?: boolean
    tipo?: boolean
    provenienza?: boolean
    collegato?: boolean
    note?: boolean
    data_di_nascita?: boolean
    luogo_nascita?: boolean
    provincia_nascita?: boolean
    numero_passaporto?: boolean
    data_scadenza_passaporto?: boolean
    nazionalita?: boolean
    provincia?: boolean
    sesso?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectScalar = {
    id?: boolean
    nome?: boolean
    cognome?: boolean
    tel?: boolean
    indirizzo?: boolean
    CAP?: boolean
    citta?: boolean
    CF?: boolean
    email?: boolean
    tipo?: boolean
    provenienza?: boolean
    collegato?: boolean
    note?: boolean
    data_di_nascita?: boolean
    luogo_nascita?: boolean
    provincia_nascita?: boolean
    numero_passaporto?: boolean
    data_scadenza_passaporto?: boolean
    nazionalita?: boolean
    provincia?: boolean
    sesso?: boolean
  }

  export type ClienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cognome" | "tel" | "indirizzo" | "CAP" | "citta" | "CF" | "email" | "tipo" | "provenienza" | "collegato" | "note" | "data_di_nascita" | "luogo_nascita" | "provincia_nascita" | "numero_passaporto" | "data_scadenza_passaporto" | "nazionalita" | "provincia" | "sesso", ExtArgs["result"]["cliente"]>
  export type ClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivi?: boolean | Cliente$preventiviArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClienteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClienteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {
      preventivi: Prisma.$PreventivoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string | null
      cognome: string | null
      tel: string | null
      indirizzo: string | null
      CAP: string | null
      citta: string | null
      CF: string | null
      email: string
      tipo: string | null
      provenienza: string | null
      collegato: string | null
      note: string | null
      data_di_nascita: Date | null
      luogo_nascita: string | null
      provincia_nascita: string | null
      numero_passaporto: string | null
      data_scadenza_passaporto: Date | null
      nazionalita: string | null
      provincia: string | null
      sesso: string | null
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clientes and returns the data saved in the database.
     * @param {ClienteCreateManyAndReturnArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClienteCreateManyAndReturnArgs>(args?: SelectSubset<T, ClienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes and returns the data updated in the database.
     * @param {ClienteUpdateManyAndReturnArgs} args - Arguments to update many Clientes.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClienteUpdateManyAndReturnArgs>(args: SelectSubset<T, ClienteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preventivi<T extends Cliente$preventiviArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$preventiviArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cliente model
   */
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'String'>
    readonly nome: FieldRef<"Cliente", 'String'>
    readonly cognome: FieldRef<"Cliente", 'String'>
    readonly tel: FieldRef<"Cliente", 'String'>
    readonly indirizzo: FieldRef<"Cliente", 'String'>
    readonly CAP: FieldRef<"Cliente", 'String'>
    readonly citta: FieldRef<"Cliente", 'String'>
    readonly CF: FieldRef<"Cliente", 'String'>
    readonly email: FieldRef<"Cliente", 'String'>
    readonly tipo: FieldRef<"Cliente", 'String'>
    readonly provenienza: FieldRef<"Cliente", 'String'>
    readonly collegato: FieldRef<"Cliente", 'String'>
    readonly note: FieldRef<"Cliente", 'String'>
    readonly data_di_nascita: FieldRef<"Cliente", 'DateTime'>
    readonly luogo_nascita: FieldRef<"Cliente", 'String'>
    readonly provincia_nascita: FieldRef<"Cliente", 'String'>
    readonly numero_passaporto: FieldRef<"Cliente", 'String'>
    readonly data_scadenza_passaporto: FieldRef<"Cliente", 'DateTime'>
    readonly nazionalita: FieldRef<"Cliente", 'String'>
    readonly provincia: FieldRef<"Cliente", 'String'>
    readonly sesso: FieldRef<"Cliente", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
  }

  /**
   * Cliente createManyAndReturn
   */
  export type ClienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente updateManyAndReturn
   */
  export type ClienteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to delete.
     */
    limit?: number
  }

  /**
   * Cliente.preventivi
   */
  export type Cliente$preventiviArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    where?: PreventivoWhereInput
    orderBy?: PreventivoOrderByWithRelationInput | PreventivoOrderByWithRelationInput[]
    cursor?: PreventivoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreventivoScalarFieldEnum | PreventivoScalarFieldEnum[]
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
  }


  /**
   * Model Fornitore
   */

  export type AggregateFornitore = {
    _count: FornitoreCountAggregateOutputType | null
    _min: FornitoreMinAggregateOutputType | null
    _max: FornitoreMaxAggregateOutputType | null
  }

  export type FornitoreMinAggregateOutputType = {
    id: string | null
    nome: string | null
    valuta: string | null
  }

  export type FornitoreMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    valuta: string | null
  }

  export type FornitoreCountAggregateOutputType = {
    id: number
    nome: number
    valuta: number
    _all: number
  }


  export type FornitoreMinAggregateInputType = {
    id?: true
    nome?: true
    valuta?: true
  }

  export type FornitoreMaxAggregateInputType = {
    id?: true
    nome?: true
    valuta?: true
  }

  export type FornitoreCountAggregateInputType = {
    id?: true
    nome?: true
    valuta?: true
    _all?: true
  }

  export type FornitoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fornitore to aggregate.
     */
    where?: FornitoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fornitores to fetch.
     */
    orderBy?: FornitoreOrderByWithRelationInput | FornitoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FornitoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fornitores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fornitores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fornitores
    **/
    _count?: true | FornitoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FornitoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FornitoreMaxAggregateInputType
  }

  export type GetFornitoreAggregateType<T extends FornitoreAggregateArgs> = {
        [P in keyof T & keyof AggregateFornitore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFornitore[P]>
      : GetScalarType<T[P], AggregateFornitore[P]>
  }




  export type FornitoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FornitoreWhereInput
    orderBy?: FornitoreOrderByWithAggregationInput | FornitoreOrderByWithAggregationInput[]
    by: FornitoreScalarFieldEnum[] | FornitoreScalarFieldEnum
    having?: FornitoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FornitoreCountAggregateInputType | true
    _min?: FornitoreMinAggregateInputType
    _max?: FornitoreMaxAggregateInputType
  }

  export type FornitoreGroupByOutputType = {
    id: string
    nome: string
    valuta: string | null
    _count: FornitoreCountAggregateOutputType | null
    _min: FornitoreMinAggregateOutputType | null
    _max: FornitoreMaxAggregateOutputType | null
  }

  type GetFornitoreGroupByPayload<T extends FornitoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FornitoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FornitoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FornitoreGroupByOutputType[P]>
            : GetScalarType<T[P], FornitoreGroupByOutputType[P]>
        }
      >
    >


  export type FornitoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    valuta?: boolean
    serviziATerra?: boolean | Fornitore$serviziATerraArgs<ExtArgs>
    voli?: boolean | Fornitore$voliArgs<ExtArgs>
    assicurazioni?: boolean | Fornitore$assicurazioniArgs<ExtArgs>
    _count?: boolean | FornitoreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fornitore"]>

  export type FornitoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    valuta?: boolean
  }, ExtArgs["result"]["fornitore"]>

  export type FornitoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    valuta?: boolean
  }, ExtArgs["result"]["fornitore"]>

  export type FornitoreSelectScalar = {
    id?: boolean
    nome?: boolean
    valuta?: boolean
  }

  export type FornitoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "valuta", ExtArgs["result"]["fornitore"]>
  export type FornitoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviziATerra?: boolean | Fornitore$serviziATerraArgs<ExtArgs>
    voli?: boolean | Fornitore$voliArgs<ExtArgs>
    assicurazioni?: boolean | Fornitore$assicurazioniArgs<ExtArgs>
    _count?: boolean | FornitoreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FornitoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FornitoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FornitorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fornitore"
    objects: {
      serviziATerra: Prisma.$ServiziATerraPayload<ExtArgs>[]
      voli: Prisma.$VoloPayload<ExtArgs>[]
      assicurazioni: Prisma.$AssicurazionePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      valuta: string | null
    }, ExtArgs["result"]["fornitore"]>
    composites: {}
  }

  type FornitoreGetPayload<S extends boolean | null | undefined | FornitoreDefaultArgs> = $Result.GetResult<Prisma.$FornitorePayload, S>

  type FornitoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FornitoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FornitoreCountAggregateInputType | true
    }

  export interface FornitoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fornitore'], meta: { name: 'Fornitore' } }
    /**
     * Find zero or one Fornitore that matches the filter.
     * @param {FornitoreFindUniqueArgs} args - Arguments to find a Fornitore
     * @example
     * // Get one Fornitore
     * const fornitore = await prisma.fornitore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FornitoreFindUniqueArgs>(args: SelectSubset<T, FornitoreFindUniqueArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fornitore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FornitoreFindUniqueOrThrowArgs} args - Arguments to find a Fornitore
     * @example
     * // Get one Fornitore
     * const fornitore = await prisma.fornitore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FornitoreFindUniqueOrThrowArgs>(args: SelectSubset<T, FornitoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fornitore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornitoreFindFirstArgs} args - Arguments to find a Fornitore
     * @example
     * // Get one Fornitore
     * const fornitore = await prisma.fornitore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FornitoreFindFirstArgs>(args?: SelectSubset<T, FornitoreFindFirstArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fornitore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornitoreFindFirstOrThrowArgs} args - Arguments to find a Fornitore
     * @example
     * // Get one Fornitore
     * const fornitore = await prisma.fornitore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FornitoreFindFirstOrThrowArgs>(args?: SelectSubset<T, FornitoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fornitores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornitoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fornitores
     * const fornitores = await prisma.fornitore.findMany()
     * 
     * // Get first 10 Fornitores
     * const fornitores = await prisma.fornitore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fornitoreWithIdOnly = await prisma.fornitore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FornitoreFindManyArgs>(args?: SelectSubset<T, FornitoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fornitore.
     * @param {FornitoreCreateArgs} args - Arguments to create a Fornitore.
     * @example
     * // Create one Fornitore
     * const Fornitore = await prisma.fornitore.create({
     *   data: {
     *     // ... data to create a Fornitore
     *   }
     * })
     * 
     */
    create<T extends FornitoreCreateArgs>(args: SelectSubset<T, FornitoreCreateArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fornitores.
     * @param {FornitoreCreateManyArgs} args - Arguments to create many Fornitores.
     * @example
     * // Create many Fornitores
     * const fornitore = await prisma.fornitore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FornitoreCreateManyArgs>(args?: SelectSubset<T, FornitoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fornitores and returns the data saved in the database.
     * @param {FornitoreCreateManyAndReturnArgs} args - Arguments to create many Fornitores.
     * @example
     * // Create many Fornitores
     * const fornitore = await prisma.fornitore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fornitores and only return the `id`
     * const fornitoreWithIdOnly = await prisma.fornitore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FornitoreCreateManyAndReturnArgs>(args?: SelectSubset<T, FornitoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fornitore.
     * @param {FornitoreDeleteArgs} args - Arguments to delete one Fornitore.
     * @example
     * // Delete one Fornitore
     * const Fornitore = await prisma.fornitore.delete({
     *   where: {
     *     // ... filter to delete one Fornitore
     *   }
     * })
     * 
     */
    delete<T extends FornitoreDeleteArgs>(args: SelectSubset<T, FornitoreDeleteArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fornitore.
     * @param {FornitoreUpdateArgs} args - Arguments to update one Fornitore.
     * @example
     * // Update one Fornitore
     * const fornitore = await prisma.fornitore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FornitoreUpdateArgs>(args: SelectSubset<T, FornitoreUpdateArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fornitores.
     * @param {FornitoreDeleteManyArgs} args - Arguments to filter Fornitores to delete.
     * @example
     * // Delete a few Fornitores
     * const { count } = await prisma.fornitore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FornitoreDeleteManyArgs>(args?: SelectSubset<T, FornitoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fornitores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornitoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fornitores
     * const fornitore = await prisma.fornitore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FornitoreUpdateManyArgs>(args: SelectSubset<T, FornitoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fornitores and returns the data updated in the database.
     * @param {FornitoreUpdateManyAndReturnArgs} args - Arguments to update many Fornitores.
     * @example
     * // Update many Fornitores
     * const fornitore = await prisma.fornitore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fornitores and only return the `id`
     * const fornitoreWithIdOnly = await prisma.fornitore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FornitoreUpdateManyAndReturnArgs>(args: SelectSubset<T, FornitoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fornitore.
     * @param {FornitoreUpsertArgs} args - Arguments to update or create a Fornitore.
     * @example
     * // Update or create a Fornitore
     * const fornitore = await prisma.fornitore.upsert({
     *   create: {
     *     // ... data to create a Fornitore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fornitore we want to update
     *   }
     * })
     */
    upsert<T extends FornitoreUpsertArgs>(args: SelectSubset<T, FornitoreUpsertArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fornitores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornitoreCountArgs} args - Arguments to filter Fornitores to count.
     * @example
     * // Count the number of Fornitores
     * const count = await prisma.fornitore.count({
     *   where: {
     *     // ... the filter for the Fornitores we want to count
     *   }
     * })
    **/
    count<T extends FornitoreCountArgs>(
      args?: Subset<T, FornitoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FornitoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fornitore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornitoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FornitoreAggregateArgs>(args: Subset<T, FornitoreAggregateArgs>): Prisma.PrismaPromise<GetFornitoreAggregateType<T>>

    /**
     * Group by Fornitore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FornitoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FornitoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FornitoreGroupByArgs['orderBy'] }
        : { orderBy?: FornitoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FornitoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFornitoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fornitore model
   */
  readonly fields: FornitoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fornitore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FornitoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviziATerra<T extends Fornitore$serviziATerraArgs<ExtArgs> = {}>(args?: Subset<T, Fornitore$serviziATerraArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    voli<T extends Fornitore$voliArgs<ExtArgs> = {}>(args?: Subset<T, Fornitore$voliArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assicurazioni<T extends Fornitore$assicurazioniArgs<ExtArgs> = {}>(args?: Subset<T, Fornitore$assicurazioniArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fornitore model
   */
  interface FornitoreFieldRefs {
    readonly id: FieldRef<"Fornitore", 'String'>
    readonly nome: FieldRef<"Fornitore", 'String'>
    readonly valuta: FieldRef<"Fornitore", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Fornitore findUnique
   */
  export type FornitoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * Filter, which Fornitore to fetch.
     */
    where: FornitoreWhereUniqueInput
  }

  /**
   * Fornitore findUniqueOrThrow
   */
  export type FornitoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * Filter, which Fornitore to fetch.
     */
    where: FornitoreWhereUniqueInput
  }

  /**
   * Fornitore findFirst
   */
  export type FornitoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * Filter, which Fornitore to fetch.
     */
    where?: FornitoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fornitores to fetch.
     */
    orderBy?: FornitoreOrderByWithRelationInput | FornitoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fornitores.
     */
    cursor?: FornitoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fornitores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fornitores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fornitores.
     */
    distinct?: FornitoreScalarFieldEnum | FornitoreScalarFieldEnum[]
  }

  /**
   * Fornitore findFirstOrThrow
   */
  export type FornitoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * Filter, which Fornitore to fetch.
     */
    where?: FornitoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fornitores to fetch.
     */
    orderBy?: FornitoreOrderByWithRelationInput | FornitoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fornitores.
     */
    cursor?: FornitoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fornitores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fornitores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fornitores.
     */
    distinct?: FornitoreScalarFieldEnum | FornitoreScalarFieldEnum[]
  }

  /**
   * Fornitore findMany
   */
  export type FornitoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * Filter, which Fornitores to fetch.
     */
    where?: FornitoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fornitores to fetch.
     */
    orderBy?: FornitoreOrderByWithRelationInput | FornitoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fornitores.
     */
    cursor?: FornitoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fornitores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fornitores.
     */
    skip?: number
    distinct?: FornitoreScalarFieldEnum | FornitoreScalarFieldEnum[]
  }

  /**
   * Fornitore create
   */
  export type FornitoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * The data needed to create a Fornitore.
     */
    data: XOR<FornitoreCreateInput, FornitoreUncheckedCreateInput>
  }

  /**
   * Fornitore createMany
   */
  export type FornitoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fornitores.
     */
    data: FornitoreCreateManyInput | FornitoreCreateManyInput[]
  }

  /**
   * Fornitore createManyAndReturn
   */
  export type FornitoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * The data used to create many Fornitores.
     */
    data: FornitoreCreateManyInput | FornitoreCreateManyInput[]
  }

  /**
   * Fornitore update
   */
  export type FornitoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * The data needed to update a Fornitore.
     */
    data: XOR<FornitoreUpdateInput, FornitoreUncheckedUpdateInput>
    /**
     * Choose, which Fornitore to update.
     */
    where: FornitoreWhereUniqueInput
  }

  /**
   * Fornitore updateMany
   */
  export type FornitoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fornitores.
     */
    data: XOR<FornitoreUpdateManyMutationInput, FornitoreUncheckedUpdateManyInput>
    /**
     * Filter which Fornitores to update
     */
    where?: FornitoreWhereInput
    /**
     * Limit how many Fornitores to update.
     */
    limit?: number
  }

  /**
   * Fornitore updateManyAndReturn
   */
  export type FornitoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * The data used to update Fornitores.
     */
    data: XOR<FornitoreUpdateManyMutationInput, FornitoreUncheckedUpdateManyInput>
    /**
     * Filter which Fornitores to update
     */
    where?: FornitoreWhereInput
    /**
     * Limit how many Fornitores to update.
     */
    limit?: number
  }

  /**
   * Fornitore upsert
   */
  export type FornitoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * The filter to search for the Fornitore to update in case it exists.
     */
    where: FornitoreWhereUniqueInput
    /**
     * In case the Fornitore found by the `where` argument doesn't exist, create a new Fornitore with this data.
     */
    create: XOR<FornitoreCreateInput, FornitoreUncheckedCreateInput>
    /**
     * In case the Fornitore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FornitoreUpdateInput, FornitoreUncheckedUpdateInput>
  }

  /**
   * Fornitore delete
   */
  export type FornitoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    /**
     * Filter which Fornitore to delete.
     */
    where: FornitoreWhereUniqueInput
  }

  /**
   * Fornitore deleteMany
   */
  export type FornitoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fornitores to delete
     */
    where?: FornitoreWhereInput
    /**
     * Limit how many Fornitores to delete.
     */
    limit?: number
  }

  /**
   * Fornitore.serviziATerra
   */
  export type Fornitore$serviziATerraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    where?: ServiziATerraWhereInput
    orderBy?: ServiziATerraOrderByWithRelationInput | ServiziATerraOrderByWithRelationInput[]
    cursor?: ServiziATerraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiziATerraScalarFieldEnum | ServiziATerraScalarFieldEnum[]
  }

  /**
   * Fornitore.voli
   */
  export type Fornitore$voliArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    where?: VoloWhereInput
    orderBy?: VoloOrderByWithRelationInput | VoloOrderByWithRelationInput[]
    cursor?: VoloWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoloScalarFieldEnum | VoloScalarFieldEnum[]
  }

  /**
   * Fornitore.assicurazioni
   */
  export type Fornitore$assicurazioniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    where?: AssicurazioneWhereInput
    orderBy?: AssicurazioneOrderByWithRelationInput | AssicurazioneOrderByWithRelationInput[]
    cursor?: AssicurazioneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssicurazioneScalarFieldEnum | AssicurazioneScalarFieldEnum[]
  }

  /**
   * Fornitore without action
   */
  export type FornitoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
  }


  /**
   * Model Preventivo
   */

  export type AggregatePreventivo = {
    _count: PreventivoCountAggregateOutputType | null
    _avg: PreventivoAvgAggregateOutputType | null
    _sum: PreventivoSumAggregateOutputType | null
    _min: PreventivoMinAggregateOutputType | null
    _max: PreventivoMaxAggregateOutputType | null
  }

  export type PreventivoAvgAggregateOutputType = {
    percentuale_ricarico: number | null
    adulti: number | null
    bambini: number | null
  }

  export type PreventivoSumAggregateOutputType = {
    percentuale_ricarico: number | null
    adulti: number | null
    bambini: number | null
  }

  export type PreventivoMinAggregateOutputType = {
    id: string | null
    id_cliente: string | null
    percentuale_ricarico: number | null
    note: string | null
    brand: string | null
    adulti: number | null
    bambini: number | null
    destinazione: string | null
    tipo_viaggio: string | null
    note_operative: string | null
    riferimento: string | null
    data_partenza: Date | null
    operatore: string | null
    feedback: string | null
    stato: string | null
    data: Date | null
    numero_preventivo: string | null
  }

  export type PreventivoMaxAggregateOutputType = {
    id: string | null
    id_cliente: string | null
    percentuale_ricarico: number | null
    note: string | null
    brand: string | null
    adulti: number | null
    bambini: number | null
    destinazione: string | null
    tipo_viaggio: string | null
    note_operative: string | null
    riferimento: string | null
    data_partenza: Date | null
    operatore: string | null
    feedback: string | null
    stato: string | null
    data: Date | null
    numero_preventivo: string | null
  }

  export type PreventivoCountAggregateOutputType = {
    id: number
    id_cliente: number
    percentuale_ricarico: number
    note: number
    brand: number
    adulti: number
    bambini: number
    destinazione: number
    tipo_viaggio: number
    note_operative: number
    riferimento: number
    data_partenza: number
    operatore: number
    feedback: number
    stato: number
    data: number
    numero_preventivo: number
    _all: number
  }


  export type PreventivoAvgAggregateInputType = {
    percentuale_ricarico?: true
    adulti?: true
    bambini?: true
  }

  export type PreventivoSumAggregateInputType = {
    percentuale_ricarico?: true
    adulti?: true
    bambini?: true
  }

  export type PreventivoMinAggregateInputType = {
    id?: true
    id_cliente?: true
    percentuale_ricarico?: true
    note?: true
    brand?: true
    adulti?: true
    bambini?: true
    destinazione?: true
    tipo_viaggio?: true
    note_operative?: true
    riferimento?: true
    data_partenza?: true
    operatore?: true
    feedback?: true
    stato?: true
    data?: true
    numero_preventivo?: true
  }

  export type PreventivoMaxAggregateInputType = {
    id?: true
    id_cliente?: true
    percentuale_ricarico?: true
    note?: true
    brand?: true
    adulti?: true
    bambini?: true
    destinazione?: true
    tipo_viaggio?: true
    note_operative?: true
    riferimento?: true
    data_partenza?: true
    operatore?: true
    feedback?: true
    stato?: true
    data?: true
    numero_preventivo?: true
  }

  export type PreventivoCountAggregateInputType = {
    id?: true
    id_cliente?: true
    percentuale_ricarico?: true
    note?: true
    brand?: true
    adulti?: true
    bambini?: true
    destinazione?: true
    tipo_viaggio?: true
    note_operative?: true
    riferimento?: true
    data_partenza?: true
    operatore?: true
    feedback?: true
    stato?: true
    data?: true
    numero_preventivo?: true
    _all?: true
  }

  export type PreventivoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preventivo to aggregate.
     */
    where?: PreventivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preventivos to fetch.
     */
    orderBy?: PreventivoOrderByWithRelationInput | PreventivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreventivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preventivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preventivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Preventivos
    **/
    _count?: true | PreventivoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreventivoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreventivoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreventivoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreventivoMaxAggregateInputType
  }

  export type GetPreventivoAggregateType<T extends PreventivoAggregateArgs> = {
        [P in keyof T & keyof AggregatePreventivo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreventivo[P]>
      : GetScalarType<T[P], AggregatePreventivo[P]>
  }




  export type PreventivoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreventivoWhereInput
    orderBy?: PreventivoOrderByWithAggregationInput | PreventivoOrderByWithAggregationInput[]
    by: PreventivoScalarFieldEnum[] | PreventivoScalarFieldEnum
    having?: PreventivoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreventivoCountAggregateInputType | true
    _avg?: PreventivoAvgAggregateInputType
    _sum?: PreventivoSumAggregateInputType
    _min?: PreventivoMinAggregateInputType
    _max?: PreventivoMaxAggregateInputType
  }

  export type PreventivoGroupByOutputType = {
    id: string
    id_cliente: string
    percentuale_ricarico: number | null
    note: string | null
    brand: string | null
    adulti: number | null
    bambini: number | null
    destinazione: string | null
    tipo_viaggio: string | null
    note_operative: string | null
    riferimento: string | null
    data_partenza: Date | null
    operatore: string | null
    feedback: string | null
    stato: string | null
    data: Date
    numero_preventivo: string | null
    _count: PreventivoCountAggregateOutputType | null
    _avg: PreventivoAvgAggregateOutputType | null
    _sum: PreventivoSumAggregateOutputType | null
    _min: PreventivoMinAggregateOutputType | null
    _max: PreventivoMaxAggregateOutputType | null
  }

  type GetPreventivoGroupByPayload<T extends PreventivoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreventivoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreventivoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreventivoGroupByOutputType[P]>
            : GetScalarType<T[P], PreventivoGroupByOutputType[P]>
        }
      >
    >


  export type PreventivoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cliente?: boolean
    percentuale_ricarico?: boolean
    note?: boolean
    brand?: boolean
    adulti?: boolean
    bambini?: boolean
    destinazione?: boolean
    tipo_viaggio?: boolean
    note_operative?: boolean
    riferimento?: boolean
    data_partenza?: boolean
    operatore?: boolean
    feedback?: boolean
    stato?: boolean
    data?: boolean
    numero_preventivo?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    serviziATerra?: boolean | Preventivo$serviziATerraArgs<ExtArgs>
    voli?: boolean | Preventivo$voliArgs<ExtArgs>
    assicurazioni?: boolean | Preventivo$assicurazioniArgs<ExtArgs>
    preventiviAlCliente?: boolean | Preventivo$preventiviAlClienteArgs<ExtArgs>
    _count?: boolean | PreventivoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preventivo"]>

  export type PreventivoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cliente?: boolean
    percentuale_ricarico?: boolean
    note?: boolean
    brand?: boolean
    adulti?: boolean
    bambini?: boolean
    destinazione?: boolean
    tipo_viaggio?: boolean
    note_operative?: boolean
    riferimento?: boolean
    data_partenza?: boolean
    operatore?: boolean
    feedback?: boolean
    stato?: boolean
    data?: boolean
    numero_preventivo?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preventivo"]>

  export type PreventivoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cliente?: boolean
    percentuale_ricarico?: boolean
    note?: boolean
    brand?: boolean
    adulti?: boolean
    bambini?: boolean
    destinazione?: boolean
    tipo_viaggio?: boolean
    note_operative?: boolean
    riferimento?: boolean
    data_partenza?: boolean
    operatore?: boolean
    feedback?: boolean
    stato?: boolean
    data?: boolean
    numero_preventivo?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preventivo"]>

  export type PreventivoSelectScalar = {
    id?: boolean
    id_cliente?: boolean
    percentuale_ricarico?: boolean
    note?: boolean
    brand?: boolean
    adulti?: boolean
    bambini?: boolean
    destinazione?: boolean
    tipo_viaggio?: boolean
    note_operative?: boolean
    riferimento?: boolean
    data_partenza?: boolean
    operatore?: boolean
    feedback?: boolean
    stato?: boolean
    data?: boolean
    numero_preventivo?: boolean
  }

  export type PreventivoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_cliente" | "percentuale_ricarico" | "note" | "brand" | "adulti" | "bambini" | "destinazione" | "tipo_viaggio" | "note_operative" | "riferimento" | "data_partenza" | "operatore" | "feedback" | "stato" | "data" | "numero_preventivo", ExtArgs["result"]["preventivo"]>
  export type PreventivoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    serviziATerra?: boolean | Preventivo$serviziATerraArgs<ExtArgs>
    voli?: boolean | Preventivo$voliArgs<ExtArgs>
    assicurazioni?: boolean | Preventivo$assicurazioniArgs<ExtArgs>
    preventiviAlCliente?: boolean | Preventivo$preventiviAlClienteArgs<ExtArgs>
    _count?: boolean | PreventivoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PreventivoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }
  export type PreventivoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }

  export type $PreventivoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Preventivo"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs>
      serviziATerra: Prisma.$ServiziATerraPayload<ExtArgs>[]
      voli: Prisma.$VoloPayload<ExtArgs>[]
      assicurazioni: Prisma.$AssicurazionePayload<ExtArgs>[]
      preventiviAlCliente: Prisma.$PreventivoAlClientePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      id_cliente: string
      percentuale_ricarico: number | null
      note: string | null
      brand: string | null
      adulti: number | null
      bambini: number | null
      destinazione: string | null
      tipo_viaggio: string | null
      note_operative: string | null
      riferimento: string | null
      data_partenza: Date | null
      operatore: string | null
      feedback: string | null
      stato: string | null
      data: Date
      numero_preventivo: string | null
    }, ExtArgs["result"]["preventivo"]>
    composites: {}
  }

  type PreventivoGetPayload<S extends boolean | null | undefined | PreventivoDefaultArgs> = $Result.GetResult<Prisma.$PreventivoPayload, S>

  type PreventivoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreventivoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreventivoCountAggregateInputType | true
    }

  export interface PreventivoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Preventivo'], meta: { name: 'Preventivo' } }
    /**
     * Find zero or one Preventivo that matches the filter.
     * @param {PreventivoFindUniqueArgs} args - Arguments to find a Preventivo
     * @example
     * // Get one Preventivo
     * const preventivo = await prisma.preventivo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreventivoFindUniqueArgs>(args: SelectSubset<T, PreventivoFindUniqueArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Preventivo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreventivoFindUniqueOrThrowArgs} args - Arguments to find a Preventivo
     * @example
     * // Get one Preventivo
     * const preventivo = await prisma.preventivo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreventivoFindUniqueOrThrowArgs>(args: SelectSubset<T, PreventivoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preventivo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoFindFirstArgs} args - Arguments to find a Preventivo
     * @example
     * // Get one Preventivo
     * const preventivo = await prisma.preventivo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreventivoFindFirstArgs>(args?: SelectSubset<T, PreventivoFindFirstArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preventivo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoFindFirstOrThrowArgs} args - Arguments to find a Preventivo
     * @example
     * // Get one Preventivo
     * const preventivo = await prisma.preventivo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreventivoFindFirstOrThrowArgs>(args?: SelectSubset<T, PreventivoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Preventivos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Preventivos
     * const preventivos = await prisma.preventivo.findMany()
     * 
     * // Get first 10 Preventivos
     * const preventivos = await prisma.preventivo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preventivoWithIdOnly = await prisma.preventivo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreventivoFindManyArgs>(args?: SelectSubset<T, PreventivoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Preventivo.
     * @param {PreventivoCreateArgs} args - Arguments to create a Preventivo.
     * @example
     * // Create one Preventivo
     * const Preventivo = await prisma.preventivo.create({
     *   data: {
     *     // ... data to create a Preventivo
     *   }
     * })
     * 
     */
    create<T extends PreventivoCreateArgs>(args: SelectSubset<T, PreventivoCreateArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Preventivos.
     * @param {PreventivoCreateManyArgs} args - Arguments to create many Preventivos.
     * @example
     * // Create many Preventivos
     * const preventivo = await prisma.preventivo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreventivoCreateManyArgs>(args?: SelectSubset<T, PreventivoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Preventivos and returns the data saved in the database.
     * @param {PreventivoCreateManyAndReturnArgs} args - Arguments to create many Preventivos.
     * @example
     * // Create many Preventivos
     * const preventivo = await prisma.preventivo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Preventivos and only return the `id`
     * const preventivoWithIdOnly = await prisma.preventivo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreventivoCreateManyAndReturnArgs>(args?: SelectSubset<T, PreventivoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Preventivo.
     * @param {PreventivoDeleteArgs} args - Arguments to delete one Preventivo.
     * @example
     * // Delete one Preventivo
     * const Preventivo = await prisma.preventivo.delete({
     *   where: {
     *     // ... filter to delete one Preventivo
     *   }
     * })
     * 
     */
    delete<T extends PreventivoDeleteArgs>(args: SelectSubset<T, PreventivoDeleteArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Preventivo.
     * @param {PreventivoUpdateArgs} args - Arguments to update one Preventivo.
     * @example
     * // Update one Preventivo
     * const preventivo = await prisma.preventivo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreventivoUpdateArgs>(args: SelectSubset<T, PreventivoUpdateArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Preventivos.
     * @param {PreventivoDeleteManyArgs} args - Arguments to filter Preventivos to delete.
     * @example
     * // Delete a few Preventivos
     * const { count } = await prisma.preventivo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreventivoDeleteManyArgs>(args?: SelectSubset<T, PreventivoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preventivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Preventivos
     * const preventivo = await prisma.preventivo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreventivoUpdateManyArgs>(args: SelectSubset<T, PreventivoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preventivos and returns the data updated in the database.
     * @param {PreventivoUpdateManyAndReturnArgs} args - Arguments to update many Preventivos.
     * @example
     * // Update many Preventivos
     * const preventivo = await prisma.preventivo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Preventivos and only return the `id`
     * const preventivoWithIdOnly = await prisma.preventivo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PreventivoUpdateManyAndReturnArgs>(args: SelectSubset<T, PreventivoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Preventivo.
     * @param {PreventivoUpsertArgs} args - Arguments to update or create a Preventivo.
     * @example
     * // Update or create a Preventivo
     * const preventivo = await prisma.preventivo.upsert({
     *   create: {
     *     // ... data to create a Preventivo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Preventivo we want to update
     *   }
     * })
     */
    upsert<T extends PreventivoUpsertArgs>(args: SelectSubset<T, PreventivoUpsertArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Preventivos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoCountArgs} args - Arguments to filter Preventivos to count.
     * @example
     * // Count the number of Preventivos
     * const count = await prisma.preventivo.count({
     *   where: {
     *     // ... the filter for the Preventivos we want to count
     *   }
     * })
    **/
    count<T extends PreventivoCountArgs>(
      args?: Subset<T, PreventivoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreventivoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Preventivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreventivoAggregateArgs>(args: Subset<T, PreventivoAggregateArgs>): Prisma.PrismaPromise<GetPreventivoAggregateType<T>>

    /**
     * Group by Preventivo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreventivoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreventivoGroupByArgs['orderBy'] }
        : { orderBy?: PreventivoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreventivoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreventivoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Preventivo model
   */
  readonly fields: PreventivoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Preventivo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreventivoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClienteDefaultArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    serviziATerra<T extends Preventivo$serviziATerraArgs<ExtArgs> = {}>(args?: Subset<T, Preventivo$serviziATerraArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    voli<T extends Preventivo$voliArgs<ExtArgs> = {}>(args?: Subset<T, Preventivo$voliArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assicurazioni<T extends Preventivo$assicurazioniArgs<ExtArgs> = {}>(args?: Subset<T, Preventivo$assicurazioniArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    preventiviAlCliente<T extends Preventivo$preventiviAlClienteArgs<ExtArgs> = {}>(args?: Subset<T, Preventivo$preventiviAlClienteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Preventivo model
   */
  interface PreventivoFieldRefs {
    readonly id: FieldRef<"Preventivo", 'String'>
    readonly id_cliente: FieldRef<"Preventivo", 'String'>
    readonly percentuale_ricarico: FieldRef<"Preventivo", 'Float'>
    readonly note: FieldRef<"Preventivo", 'String'>
    readonly brand: FieldRef<"Preventivo", 'String'>
    readonly adulti: FieldRef<"Preventivo", 'Int'>
    readonly bambini: FieldRef<"Preventivo", 'Int'>
    readonly destinazione: FieldRef<"Preventivo", 'String'>
    readonly tipo_viaggio: FieldRef<"Preventivo", 'String'>
    readonly note_operative: FieldRef<"Preventivo", 'String'>
    readonly riferimento: FieldRef<"Preventivo", 'String'>
    readonly data_partenza: FieldRef<"Preventivo", 'DateTime'>
    readonly operatore: FieldRef<"Preventivo", 'String'>
    readonly feedback: FieldRef<"Preventivo", 'String'>
    readonly stato: FieldRef<"Preventivo", 'String'>
    readonly data: FieldRef<"Preventivo", 'DateTime'>
    readonly numero_preventivo: FieldRef<"Preventivo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Preventivo findUnique
   */
  export type PreventivoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * Filter, which Preventivo to fetch.
     */
    where: PreventivoWhereUniqueInput
  }

  /**
   * Preventivo findUniqueOrThrow
   */
  export type PreventivoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * Filter, which Preventivo to fetch.
     */
    where: PreventivoWhereUniqueInput
  }

  /**
   * Preventivo findFirst
   */
  export type PreventivoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * Filter, which Preventivo to fetch.
     */
    where?: PreventivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preventivos to fetch.
     */
    orderBy?: PreventivoOrderByWithRelationInput | PreventivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preventivos.
     */
    cursor?: PreventivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preventivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preventivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preventivos.
     */
    distinct?: PreventivoScalarFieldEnum | PreventivoScalarFieldEnum[]
  }

  /**
   * Preventivo findFirstOrThrow
   */
  export type PreventivoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * Filter, which Preventivo to fetch.
     */
    where?: PreventivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preventivos to fetch.
     */
    orderBy?: PreventivoOrderByWithRelationInput | PreventivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preventivos.
     */
    cursor?: PreventivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preventivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preventivos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preventivos.
     */
    distinct?: PreventivoScalarFieldEnum | PreventivoScalarFieldEnum[]
  }

  /**
   * Preventivo findMany
   */
  export type PreventivoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * Filter, which Preventivos to fetch.
     */
    where?: PreventivoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preventivos to fetch.
     */
    orderBy?: PreventivoOrderByWithRelationInput | PreventivoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Preventivos.
     */
    cursor?: PreventivoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preventivos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preventivos.
     */
    skip?: number
    distinct?: PreventivoScalarFieldEnum | PreventivoScalarFieldEnum[]
  }

  /**
   * Preventivo create
   */
  export type PreventivoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * The data needed to create a Preventivo.
     */
    data: XOR<PreventivoCreateInput, PreventivoUncheckedCreateInput>
  }

  /**
   * Preventivo createMany
   */
  export type PreventivoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Preventivos.
     */
    data: PreventivoCreateManyInput | PreventivoCreateManyInput[]
  }

  /**
   * Preventivo createManyAndReturn
   */
  export type PreventivoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * The data used to create many Preventivos.
     */
    data: PreventivoCreateManyInput | PreventivoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Preventivo update
   */
  export type PreventivoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * The data needed to update a Preventivo.
     */
    data: XOR<PreventivoUpdateInput, PreventivoUncheckedUpdateInput>
    /**
     * Choose, which Preventivo to update.
     */
    where: PreventivoWhereUniqueInput
  }

  /**
   * Preventivo updateMany
   */
  export type PreventivoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Preventivos.
     */
    data: XOR<PreventivoUpdateManyMutationInput, PreventivoUncheckedUpdateManyInput>
    /**
     * Filter which Preventivos to update
     */
    where?: PreventivoWhereInput
    /**
     * Limit how many Preventivos to update.
     */
    limit?: number
  }

  /**
   * Preventivo updateManyAndReturn
   */
  export type PreventivoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * The data used to update Preventivos.
     */
    data: XOR<PreventivoUpdateManyMutationInput, PreventivoUncheckedUpdateManyInput>
    /**
     * Filter which Preventivos to update
     */
    where?: PreventivoWhereInput
    /**
     * Limit how many Preventivos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Preventivo upsert
   */
  export type PreventivoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * The filter to search for the Preventivo to update in case it exists.
     */
    where: PreventivoWhereUniqueInput
    /**
     * In case the Preventivo found by the `where` argument doesn't exist, create a new Preventivo with this data.
     */
    create: XOR<PreventivoCreateInput, PreventivoUncheckedCreateInput>
    /**
     * In case the Preventivo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreventivoUpdateInput, PreventivoUncheckedUpdateInput>
  }

  /**
   * Preventivo delete
   */
  export type PreventivoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    /**
     * Filter which Preventivo to delete.
     */
    where: PreventivoWhereUniqueInput
  }

  /**
   * Preventivo deleteMany
   */
  export type PreventivoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preventivos to delete
     */
    where?: PreventivoWhereInput
    /**
     * Limit how many Preventivos to delete.
     */
    limit?: number
  }

  /**
   * Preventivo.serviziATerra
   */
  export type Preventivo$serviziATerraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    where?: ServiziATerraWhereInput
    orderBy?: ServiziATerraOrderByWithRelationInput | ServiziATerraOrderByWithRelationInput[]
    cursor?: ServiziATerraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiziATerraScalarFieldEnum | ServiziATerraScalarFieldEnum[]
  }

  /**
   * Preventivo.voli
   */
  export type Preventivo$voliArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    where?: VoloWhereInput
    orderBy?: VoloOrderByWithRelationInput | VoloOrderByWithRelationInput[]
    cursor?: VoloWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoloScalarFieldEnum | VoloScalarFieldEnum[]
  }

  /**
   * Preventivo.assicurazioni
   */
  export type Preventivo$assicurazioniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    where?: AssicurazioneWhereInput
    orderBy?: AssicurazioneOrderByWithRelationInput | AssicurazioneOrderByWithRelationInput[]
    cursor?: AssicurazioneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssicurazioneScalarFieldEnum | AssicurazioneScalarFieldEnum[]
  }

  /**
   * Preventivo.preventiviAlCliente
   */
  export type Preventivo$preventiviAlClienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    where?: PreventivoAlClienteWhereInput
    orderBy?: PreventivoAlClienteOrderByWithRelationInput | PreventivoAlClienteOrderByWithRelationInput[]
    cursor?: PreventivoAlClienteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreventivoAlClienteScalarFieldEnum | PreventivoAlClienteScalarFieldEnum[]
  }

  /**
   * Preventivo without action
   */
  export type PreventivoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
  }


  /**
   * Model ServiziATerra
   */

  export type AggregateServiziATerra = {
    _count: ServiziATerraCountAggregateOutputType | null
    _avg: ServiziATerraAvgAggregateOutputType | null
    _sum: ServiziATerraSumAggregateOutputType | null
    _min: ServiziATerraMinAggregateOutputType | null
    _max: ServiziATerraMaxAggregateOutputType | null
  }

  export type ServiziATerraAvgAggregateOutputType = {
    numero_notti: number | null
    numero_camere: number | null
    totale: number | null
    cambio: number | null
  }

  export type ServiziATerraSumAggregateOutputType = {
    numero_notti: number | null
    numero_camere: number | null
    totale: number | null
    cambio: number | null
  }

  export type ServiziATerraMinAggregateOutputType = {
    id: string | null
    id_preventivo: string | null
    id_fornitore: string | null
    id_destinazione: string | null
    descrizione: string | null
    data: Date | null
    numero_notti: number | null
    numero_camere: number | null
    totale: number | null
    valuta: string | null
    cambio: number | null
    servizio_aggiuntivo: boolean | null
  }

  export type ServiziATerraMaxAggregateOutputType = {
    id: string | null
    id_preventivo: string | null
    id_fornitore: string | null
    id_destinazione: string | null
    descrizione: string | null
    data: Date | null
    numero_notti: number | null
    numero_camere: number | null
    totale: number | null
    valuta: string | null
    cambio: number | null
    servizio_aggiuntivo: boolean | null
  }

  export type ServiziATerraCountAggregateOutputType = {
    id: number
    id_preventivo: number
    id_fornitore: number
    id_destinazione: number
    descrizione: number
    data: number
    numero_notti: number
    numero_camere: number
    totale: number
    valuta: number
    cambio: number
    servizio_aggiuntivo: number
    _all: number
  }


  export type ServiziATerraAvgAggregateInputType = {
    numero_notti?: true
    numero_camere?: true
    totale?: true
    cambio?: true
  }

  export type ServiziATerraSumAggregateInputType = {
    numero_notti?: true
    numero_camere?: true
    totale?: true
    cambio?: true
  }

  export type ServiziATerraMinAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    id_destinazione?: true
    descrizione?: true
    data?: true
    numero_notti?: true
    numero_camere?: true
    totale?: true
    valuta?: true
    cambio?: true
    servizio_aggiuntivo?: true
  }

  export type ServiziATerraMaxAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    id_destinazione?: true
    descrizione?: true
    data?: true
    numero_notti?: true
    numero_camere?: true
    totale?: true
    valuta?: true
    cambio?: true
    servizio_aggiuntivo?: true
  }

  export type ServiziATerraCountAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    id_destinazione?: true
    descrizione?: true
    data?: true
    numero_notti?: true
    numero_camere?: true
    totale?: true
    valuta?: true
    cambio?: true
    servizio_aggiuntivo?: true
    _all?: true
  }

  export type ServiziATerraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiziATerra to aggregate.
     */
    where?: ServiziATerraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiziATerras to fetch.
     */
    orderBy?: ServiziATerraOrderByWithRelationInput | ServiziATerraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiziATerraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiziATerras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiziATerras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiziATerras
    **/
    _count?: true | ServiziATerraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiziATerraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiziATerraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiziATerraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiziATerraMaxAggregateInputType
  }

  export type GetServiziATerraAggregateType<T extends ServiziATerraAggregateArgs> = {
        [P in keyof T & keyof AggregateServiziATerra]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiziATerra[P]>
      : GetScalarType<T[P], AggregateServiziATerra[P]>
  }




  export type ServiziATerraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiziATerraWhereInput
    orderBy?: ServiziATerraOrderByWithAggregationInput | ServiziATerraOrderByWithAggregationInput[]
    by: ServiziATerraScalarFieldEnum[] | ServiziATerraScalarFieldEnum
    having?: ServiziATerraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiziATerraCountAggregateInputType | true
    _avg?: ServiziATerraAvgAggregateInputType
    _sum?: ServiziATerraSumAggregateInputType
    _min?: ServiziATerraMinAggregateInputType
    _max?: ServiziATerraMaxAggregateInputType
  }

  export type ServiziATerraGroupByOutputType = {
    id: string
    id_preventivo: string
    id_fornitore: string | null
    id_destinazione: string | null
    descrizione: string | null
    data: Date | null
    numero_notti: number | null
    numero_camere: number | null
    totale: number | null
    valuta: string | null
    cambio: number | null
    servizio_aggiuntivo: boolean | null
    _count: ServiziATerraCountAggregateOutputType | null
    _avg: ServiziATerraAvgAggregateOutputType | null
    _sum: ServiziATerraSumAggregateOutputType | null
    _min: ServiziATerraMinAggregateOutputType | null
    _max: ServiziATerraMaxAggregateOutputType | null
  }

  type GetServiziATerraGroupByPayload<T extends ServiziATerraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiziATerraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiziATerraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiziATerraGroupByOutputType[P]>
            : GetScalarType<T[P], ServiziATerraGroupByOutputType[P]>
        }
      >
    >


  export type ServiziATerraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    id_destinazione?: boolean
    descrizione?: boolean
    data?: boolean
    numero_notti?: boolean
    numero_camere?: boolean
    totale?: boolean
    valuta?: boolean
    cambio?: boolean
    servizio_aggiuntivo?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | ServiziATerra$fornitoreArgs<ExtArgs>
    destinazione?: boolean | ServiziATerra$destinazioneArgs<ExtArgs>
  }, ExtArgs["result"]["serviziATerra"]>

  export type ServiziATerraSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    id_destinazione?: boolean
    descrizione?: boolean
    data?: boolean
    numero_notti?: boolean
    numero_camere?: boolean
    totale?: boolean
    valuta?: boolean
    cambio?: boolean
    servizio_aggiuntivo?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | ServiziATerra$fornitoreArgs<ExtArgs>
    destinazione?: boolean | ServiziATerra$destinazioneArgs<ExtArgs>
  }, ExtArgs["result"]["serviziATerra"]>

  export type ServiziATerraSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    id_destinazione?: boolean
    descrizione?: boolean
    data?: boolean
    numero_notti?: boolean
    numero_camere?: boolean
    totale?: boolean
    valuta?: boolean
    cambio?: boolean
    servizio_aggiuntivo?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | ServiziATerra$fornitoreArgs<ExtArgs>
    destinazione?: boolean | ServiziATerra$destinazioneArgs<ExtArgs>
  }, ExtArgs["result"]["serviziATerra"]>

  export type ServiziATerraSelectScalar = {
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    id_destinazione?: boolean
    descrizione?: boolean
    data?: boolean
    numero_notti?: boolean
    numero_camere?: boolean
    totale?: boolean
    valuta?: boolean
    cambio?: boolean
    servizio_aggiuntivo?: boolean
  }

  export type ServiziATerraOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_preventivo" | "id_fornitore" | "id_destinazione" | "descrizione" | "data" | "numero_notti" | "numero_camere" | "totale" | "valuta" | "cambio" | "servizio_aggiuntivo", ExtArgs["result"]["serviziATerra"]>
  export type ServiziATerraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | ServiziATerra$fornitoreArgs<ExtArgs>
    destinazione?: boolean | ServiziATerra$destinazioneArgs<ExtArgs>
  }
  export type ServiziATerraIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | ServiziATerra$fornitoreArgs<ExtArgs>
    destinazione?: boolean | ServiziATerra$destinazioneArgs<ExtArgs>
  }
  export type ServiziATerraIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | ServiziATerra$fornitoreArgs<ExtArgs>
    destinazione?: boolean | ServiziATerra$destinazioneArgs<ExtArgs>
  }

  export type $ServiziATerraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiziATerra"
    objects: {
      preventivo: Prisma.$PreventivoPayload<ExtArgs>
      fornitore: Prisma.$FornitorePayload<ExtArgs> | null
      destinazione: Prisma.$DestinazionePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      id_preventivo: string
      id_fornitore: string | null
      id_destinazione: string | null
      descrizione: string | null
      data: Date | null
      numero_notti: number | null
      numero_camere: number | null
      totale: number | null
      valuta: string | null
      cambio: number | null
      servizio_aggiuntivo: boolean | null
    }, ExtArgs["result"]["serviziATerra"]>
    composites: {}
  }

  type ServiziATerraGetPayload<S extends boolean | null | undefined | ServiziATerraDefaultArgs> = $Result.GetResult<Prisma.$ServiziATerraPayload, S>

  type ServiziATerraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiziATerraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiziATerraCountAggregateInputType | true
    }

  export interface ServiziATerraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiziATerra'], meta: { name: 'ServiziATerra' } }
    /**
     * Find zero or one ServiziATerra that matches the filter.
     * @param {ServiziATerraFindUniqueArgs} args - Arguments to find a ServiziATerra
     * @example
     * // Get one ServiziATerra
     * const serviziATerra = await prisma.serviziATerra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiziATerraFindUniqueArgs>(args: SelectSubset<T, ServiziATerraFindUniqueArgs<ExtArgs>>): Prisma__ServiziATerraClient<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiziATerra that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiziATerraFindUniqueOrThrowArgs} args - Arguments to find a ServiziATerra
     * @example
     * // Get one ServiziATerra
     * const serviziATerra = await prisma.serviziATerra.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiziATerraFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiziATerraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiziATerraClient<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiziATerra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiziATerraFindFirstArgs} args - Arguments to find a ServiziATerra
     * @example
     * // Get one ServiziATerra
     * const serviziATerra = await prisma.serviziATerra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiziATerraFindFirstArgs>(args?: SelectSubset<T, ServiziATerraFindFirstArgs<ExtArgs>>): Prisma__ServiziATerraClient<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiziATerra that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiziATerraFindFirstOrThrowArgs} args - Arguments to find a ServiziATerra
     * @example
     * // Get one ServiziATerra
     * const serviziATerra = await prisma.serviziATerra.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiziATerraFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiziATerraFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiziATerraClient<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiziATerras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiziATerraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiziATerras
     * const serviziATerras = await prisma.serviziATerra.findMany()
     * 
     * // Get first 10 ServiziATerras
     * const serviziATerras = await prisma.serviziATerra.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviziATerraWithIdOnly = await prisma.serviziATerra.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiziATerraFindManyArgs>(args?: SelectSubset<T, ServiziATerraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiziATerra.
     * @param {ServiziATerraCreateArgs} args - Arguments to create a ServiziATerra.
     * @example
     * // Create one ServiziATerra
     * const ServiziATerra = await prisma.serviziATerra.create({
     *   data: {
     *     // ... data to create a ServiziATerra
     *   }
     * })
     * 
     */
    create<T extends ServiziATerraCreateArgs>(args: SelectSubset<T, ServiziATerraCreateArgs<ExtArgs>>): Prisma__ServiziATerraClient<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiziATerras.
     * @param {ServiziATerraCreateManyArgs} args - Arguments to create many ServiziATerras.
     * @example
     * // Create many ServiziATerras
     * const serviziATerra = await prisma.serviziATerra.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiziATerraCreateManyArgs>(args?: SelectSubset<T, ServiziATerraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiziATerras and returns the data saved in the database.
     * @param {ServiziATerraCreateManyAndReturnArgs} args - Arguments to create many ServiziATerras.
     * @example
     * // Create many ServiziATerras
     * const serviziATerra = await prisma.serviziATerra.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiziATerras and only return the `id`
     * const serviziATerraWithIdOnly = await prisma.serviziATerra.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiziATerraCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiziATerraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiziATerra.
     * @param {ServiziATerraDeleteArgs} args - Arguments to delete one ServiziATerra.
     * @example
     * // Delete one ServiziATerra
     * const ServiziATerra = await prisma.serviziATerra.delete({
     *   where: {
     *     // ... filter to delete one ServiziATerra
     *   }
     * })
     * 
     */
    delete<T extends ServiziATerraDeleteArgs>(args: SelectSubset<T, ServiziATerraDeleteArgs<ExtArgs>>): Prisma__ServiziATerraClient<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiziATerra.
     * @param {ServiziATerraUpdateArgs} args - Arguments to update one ServiziATerra.
     * @example
     * // Update one ServiziATerra
     * const serviziATerra = await prisma.serviziATerra.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiziATerraUpdateArgs>(args: SelectSubset<T, ServiziATerraUpdateArgs<ExtArgs>>): Prisma__ServiziATerraClient<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiziATerras.
     * @param {ServiziATerraDeleteManyArgs} args - Arguments to filter ServiziATerras to delete.
     * @example
     * // Delete a few ServiziATerras
     * const { count } = await prisma.serviziATerra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiziATerraDeleteManyArgs>(args?: SelectSubset<T, ServiziATerraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiziATerras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiziATerraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiziATerras
     * const serviziATerra = await prisma.serviziATerra.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiziATerraUpdateManyArgs>(args: SelectSubset<T, ServiziATerraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiziATerras and returns the data updated in the database.
     * @param {ServiziATerraUpdateManyAndReturnArgs} args - Arguments to update many ServiziATerras.
     * @example
     * // Update many ServiziATerras
     * const serviziATerra = await prisma.serviziATerra.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiziATerras and only return the `id`
     * const serviziATerraWithIdOnly = await prisma.serviziATerra.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiziATerraUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiziATerraUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiziATerra.
     * @param {ServiziATerraUpsertArgs} args - Arguments to update or create a ServiziATerra.
     * @example
     * // Update or create a ServiziATerra
     * const serviziATerra = await prisma.serviziATerra.upsert({
     *   create: {
     *     // ... data to create a ServiziATerra
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiziATerra we want to update
     *   }
     * })
     */
    upsert<T extends ServiziATerraUpsertArgs>(args: SelectSubset<T, ServiziATerraUpsertArgs<ExtArgs>>): Prisma__ServiziATerraClient<$Result.GetResult<Prisma.$ServiziATerraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiziATerras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiziATerraCountArgs} args - Arguments to filter ServiziATerras to count.
     * @example
     * // Count the number of ServiziATerras
     * const count = await prisma.serviziATerra.count({
     *   where: {
     *     // ... the filter for the ServiziATerras we want to count
     *   }
     * })
    **/
    count<T extends ServiziATerraCountArgs>(
      args?: Subset<T, ServiziATerraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiziATerraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiziATerra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiziATerraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiziATerraAggregateArgs>(args: Subset<T, ServiziATerraAggregateArgs>): Prisma.PrismaPromise<GetServiziATerraAggregateType<T>>

    /**
     * Group by ServiziATerra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiziATerraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiziATerraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiziATerraGroupByArgs['orderBy'] }
        : { orderBy?: ServiziATerraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiziATerraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiziATerraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiziATerra model
   */
  readonly fields: ServiziATerraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiziATerra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiziATerraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preventivo<T extends PreventivoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PreventivoDefaultArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fornitore<T extends ServiziATerra$fornitoreArgs<ExtArgs> = {}>(args?: Subset<T, ServiziATerra$fornitoreArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    destinazione<T extends ServiziATerra$destinazioneArgs<ExtArgs> = {}>(args?: Subset<T, ServiziATerra$destinazioneArgs<ExtArgs>>): Prisma__DestinazioneClient<$Result.GetResult<Prisma.$DestinazionePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiziATerra model
   */
  interface ServiziATerraFieldRefs {
    readonly id: FieldRef<"ServiziATerra", 'String'>
    readonly id_preventivo: FieldRef<"ServiziATerra", 'String'>
    readonly id_fornitore: FieldRef<"ServiziATerra", 'String'>
    readonly id_destinazione: FieldRef<"ServiziATerra", 'String'>
    readonly descrizione: FieldRef<"ServiziATerra", 'String'>
    readonly data: FieldRef<"ServiziATerra", 'DateTime'>
    readonly numero_notti: FieldRef<"ServiziATerra", 'Int'>
    readonly numero_camere: FieldRef<"ServiziATerra", 'Int'>
    readonly totale: FieldRef<"ServiziATerra", 'Float'>
    readonly valuta: FieldRef<"ServiziATerra", 'String'>
    readonly cambio: FieldRef<"ServiziATerra", 'Float'>
    readonly servizio_aggiuntivo: FieldRef<"ServiziATerra", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ServiziATerra findUnique
   */
  export type ServiziATerraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * Filter, which ServiziATerra to fetch.
     */
    where: ServiziATerraWhereUniqueInput
  }

  /**
   * ServiziATerra findUniqueOrThrow
   */
  export type ServiziATerraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * Filter, which ServiziATerra to fetch.
     */
    where: ServiziATerraWhereUniqueInput
  }

  /**
   * ServiziATerra findFirst
   */
  export type ServiziATerraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * Filter, which ServiziATerra to fetch.
     */
    where?: ServiziATerraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiziATerras to fetch.
     */
    orderBy?: ServiziATerraOrderByWithRelationInput | ServiziATerraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiziATerras.
     */
    cursor?: ServiziATerraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiziATerras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiziATerras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiziATerras.
     */
    distinct?: ServiziATerraScalarFieldEnum | ServiziATerraScalarFieldEnum[]
  }

  /**
   * ServiziATerra findFirstOrThrow
   */
  export type ServiziATerraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * Filter, which ServiziATerra to fetch.
     */
    where?: ServiziATerraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiziATerras to fetch.
     */
    orderBy?: ServiziATerraOrderByWithRelationInput | ServiziATerraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiziATerras.
     */
    cursor?: ServiziATerraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiziATerras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiziATerras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiziATerras.
     */
    distinct?: ServiziATerraScalarFieldEnum | ServiziATerraScalarFieldEnum[]
  }

  /**
   * ServiziATerra findMany
   */
  export type ServiziATerraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * Filter, which ServiziATerras to fetch.
     */
    where?: ServiziATerraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiziATerras to fetch.
     */
    orderBy?: ServiziATerraOrderByWithRelationInput | ServiziATerraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiziATerras.
     */
    cursor?: ServiziATerraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiziATerras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiziATerras.
     */
    skip?: number
    distinct?: ServiziATerraScalarFieldEnum | ServiziATerraScalarFieldEnum[]
  }

  /**
   * ServiziATerra create
   */
  export type ServiziATerraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiziATerra.
     */
    data: XOR<ServiziATerraCreateInput, ServiziATerraUncheckedCreateInput>
  }

  /**
   * ServiziATerra createMany
   */
  export type ServiziATerraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiziATerras.
     */
    data: ServiziATerraCreateManyInput | ServiziATerraCreateManyInput[]
  }

  /**
   * ServiziATerra createManyAndReturn
   */
  export type ServiziATerraCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * The data used to create many ServiziATerras.
     */
    data: ServiziATerraCreateManyInput | ServiziATerraCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiziATerra update
   */
  export type ServiziATerraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiziATerra.
     */
    data: XOR<ServiziATerraUpdateInput, ServiziATerraUncheckedUpdateInput>
    /**
     * Choose, which ServiziATerra to update.
     */
    where: ServiziATerraWhereUniqueInput
  }

  /**
   * ServiziATerra updateMany
   */
  export type ServiziATerraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiziATerras.
     */
    data: XOR<ServiziATerraUpdateManyMutationInput, ServiziATerraUncheckedUpdateManyInput>
    /**
     * Filter which ServiziATerras to update
     */
    where?: ServiziATerraWhereInput
    /**
     * Limit how many ServiziATerras to update.
     */
    limit?: number
  }

  /**
   * ServiziATerra updateManyAndReturn
   */
  export type ServiziATerraUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * The data used to update ServiziATerras.
     */
    data: XOR<ServiziATerraUpdateManyMutationInput, ServiziATerraUncheckedUpdateManyInput>
    /**
     * Filter which ServiziATerras to update
     */
    where?: ServiziATerraWhereInput
    /**
     * Limit how many ServiziATerras to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiziATerra upsert
   */
  export type ServiziATerraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiziATerra to update in case it exists.
     */
    where: ServiziATerraWhereUniqueInput
    /**
     * In case the ServiziATerra found by the `where` argument doesn't exist, create a new ServiziATerra with this data.
     */
    create: XOR<ServiziATerraCreateInput, ServiziATerraUncheckedCreateInput>
    /**
     * In case the ServiziATerra was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiziATerraUpdateInput, ServiziATerraUncheckedUpdateInput>
  }

  /**
   * ServiziATerra delete
   */
  export type ServiziATerraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
    /**
     * Filter which ServiziATerra to delete.
     */
    where: ServiziATerraWhereUniqueInput
  }

  /**
   * ServiziATerra deleteMany
   */
  export type ServiziATerraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiziATerras to delete
     */
    where?: ServiziATerraWhereInput
    /**
     * Limit how many ServiziATerras to delete.
     */
    limit?: number
  }

  /**
   * ServiziATerra.fornitore
   */
  export type ServiziATerra$fornitoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    where?: FornitoreWhereInput
  }

  /**
   * ServiziATerra.destinazione
   */
  export type ServiziATerra$destinazioneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Destinazione
     */
    select?: DestinazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Destinazione
     */
    omit?: DestinazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DestinazioneInclude<ExtArgs> | null
    where?: DestinazioneWhereInput
  }

  /**
   * ServiziATerra without action
   */
  export type ServiziATerraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiziATerra
     */
    select?: ServiziATerraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiziATerra
     */
    omit?: ServiziATerraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiziATerraInclude<ExtArgs> | null
  }


  /**
   * Model Volo
   */

  export type AggregateVolo = {
    _count: VoloCountAggregateOutputType | null
    _avg: VoloAvgAggregateOutputType | null
    _sum: VoloSumAggregateOutputType | null
    _min: VoloMinAggregateOutputType | null
    _max: VoloMaxAggregateOutputType | null
  }

  export type VoloAvgAggregateOutputType = {
    totale: number | null
    ricarico: number | null
    numero: number | null
    cambio: number | null
  }

  export type VoloSumAggregateOutputType = {
    totale: number | null
    ricarico: number | null
    numero: number | null
    cambio: number | null
  }

  export type VoloMinAggregateOutputType = {
    id: string | null
    id_preventivo: string | null
    id_fornitore: string | null
    compagnia_aerea: string | null
    descrizione: string | null
    data_partenza: Date | null
    data_arrivo: Date | null
    totale: number | null
    ricarico: number | null
    numero: number | null
    valuta: string | null
    cambio: number | null
  }

  export type VoloMaxAggregateOutputType = {
    id: string | null
    id_preventivo: string | null
    id_fornitore: string | null
    compagnia_aerea: string | null
    descrizione: string | null
    data_partenza: Date | null
    data_arrivo: Date | null
    totale: number | null
    ricarico: number | null
    numero: number | null
    valuta: string | null
    cambio: number | null
  }

  export type VoloCountAggregateOutputType = {
    id: number
    id_preventivo: number
    id_fornitore: number
    compagnia_aerea: number
    descrizione: number
    data_partenza: number
    data_arrivo: number
    totale: number
    ricarico: number
    numero: number
    valuta: number
    cambio: number
    _all: number
  }


  export type VoloAvgAggregateInputType = {
    totale?: true
    ricarico?: true
    numero?: true
    cambio?: true
  }

  export type VoloSumAggregateInputType = {
    totale?: true
    ricarico?: true
    numero?: true
    cambio?: true
  }

  export type VoloMinAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    compagnia_aerea?: true
    descrizione?: true
    data_partenza?: true
    data_arrivo?: true
    totale?: true
    ricarico?: true
    numero?: true
    valuta?: true
    cambio?: true
  }

  export type VoloMaxAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    compagnia_aerea?: true
    descrizione?: true
    data_partenza?: true
    data_arrivo?: true
    totale?: true
    ricarico?: true
    numero?: true
    valuta?: true
    cambio?: true
  }

  export type VoloCountAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    compagnia_aerea?: true
    descrizione?: true
    data_partenza?: true
    data_arrivo?: true
    totale?: true
    ricarico?: true
    numero?: true
    valuta?: true
    cambio?: true
    _all?: true
  }

  export type VoloAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Volo to aggregate.
     */
    where?: VoloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Volos to fetch.
     */
    orderBy?: VoloOrderByWithRelationInput | VoloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Volos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Volos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Volos
    **/
    _count?: true | VoloCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoloAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoloSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoloMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoloMaxAggregateInputType
  }

  export type GetVoloAggregateType<T extends VoloAggregateArgs> = {
        [P in keyof T & keyof AggregateVolo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVolo[P]>
      : GetScalarType<T[P], AggregateVolo[P]>
  }




  export type VoloGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoloWhereInput
    orderBy?: VoloOrderByWithAggregationInput | VoloOrderByWithAggregationInput[]
    by: VoloScalarFieldEnum[] | VoloScalarFieldEnum
    having?: VoloScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoloCountAggregateInputType | true
    _avg?: VoloAvgAggregateInputType
    _sum?: VoloSumAggregateInputType
    _min?: VoloMinAggregateInputType
    _max?: VoloMaxAggregateInputType
  }

  export type VoloGroupByOutputType = {
    id: string
    id_preventivo: string
    id_fornitore: string | null
    compagnia_aerea: string | null
    descrizione: string | null
    data_partenza: Date | null
    data_arrivo: Date | null
    totale: number | null
    ricarico: number | null
    numero: number | null
    valuta: string | null
    cambio: number | null
    _count: VoloCountAggregateOutputType | null
    _avg: VoloAvgAggregateOutputType | null
    _sum: VoloSumAggregateOutputType | null
    _min: VoloMinAggregateOutputType | null
    _max: VoloMaxAggregateOutputType | null
  }

  type GetVoloGroupByPayload<T extends VoloGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoloGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoloGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoloGroupByOutputType[P]>
            : GetScalarType<T[P], VoloGroupByOutputType[P]>
        }
      >
    >


  export type VoloSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    compagnia_aerea?: boolean
    descrizione?: boolean
    data_partenza?: boolean
    data_arrivo?: boolean
    totale?: boolean
    ricarico?: boolean
    numero?: boolean
    valuta?: boolean
    cambio?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Volo$fornitoreArgs<ExtArgs>
  }, ExtArgs["result"]["volo"]>

  export type VoloSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    compagnia_aerea?: boolean
    descrizione?: boolean
    data_partenza?: boolean
    data_arrivo?: boolean
    totale?: boolean
    ricarico?: boolean
    numero?: boolean
    valuta?: boolean
    cambio?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Volo$fornitoreArgs<ExtArgs>
  }, ExtArgs["result"]["volo"]>

  export type VoloSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    compagnia_aerea?: boolean
    descrizione?: boolean
    data_partenza?: boolean
    data_arrivo?: boolean
    totale?: boolean
    ricarico?: boolean
    numero?: boolean
    valuta?: boolean
    cambio?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Volo$fornitoreArgs<ExtArgs>
  }, ExtArgs["result"]["volo"]>

  export type VoloSelectScalar = {
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    compagnia_aerea?: boolean
    descrizione?: boolean
    data_partenza?: boolean
    data_arrivo?: boolean
    totale?: boolean
    ricarico?: boolean
    numero?: boolean
    valuta?: boolean
    cambio?: boolean
  }

  export type VoloOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_preventivo" | "id_fornitore" | "compagnia_aerea" | "descrizione" | "data_partenza" | "data_arrivo" | "totale" | "ricarico" | "numero" | "valuta" | "cambio", ExtArgs["result"]["volo"]>
  export type VoloInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Volo$fornitoreArgs<ExtArgs>
  }
  export type VoloIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Volo$fornitoreArgs<ExtArgs>
  }
  export type VoloIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Volo$fornitoreArgs<ExtArgs>
  }

  export type $VoloPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Volo"
    objects: {
      preventivo: Prisma.$PreventivoPayload<ExtArgs>
      fornitore: Prisma.$FornitorePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      id_preventivo: string
      id_fornitore: string | null
      compagnia_aerea: string | null
      descrizione: string | null
      data_partenza: Date | null
      data_arrivo: Date | null
      totale: number | null
      ricarico: number | null
      numero: number | null
      valuta: string | null
      cambio: number | null
    }, ExtArgs["result"]["volo"]>
    composites: {}
  }

  type VoloGetPayload<S extends boolean | null | undefined | VoloDefaultArgs> = $Result.GetResult<Prisma.$VoloPayload, S>

  type VoloCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoloFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoloCountAggregateInputType | true
    }

  export interface VoloDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Volo'], meta: { name: 'Volo' } }
    /**
     * Find zero or one Volo that matches the filter.
     * @param {VoloFindUniqueArgs} args - Arguments to find a Volo
     * @example
     * // Get one Volo
     * const volo = await prisma.volo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoloFindUniqueArgs>(args: SelectSubset<T, VoloFindUniqueArgs<ExtArgs>>): Prisma__VoloClient<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Volo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoloFindUniqueOrThrowArgs} args - Arguments to find a Volo
     * @example
     * // Get one Volo
     * const volo = await prisma.volo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoloFindUniqueOrThrowArgs>(args: SelectSubset<T, VoloFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoloClient<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Volo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoloFindFirstArgs} args - Arguments to find a Volo
     * @example
     * // Get one Volo
     * const volo = await prisma.volo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoloFindFirstArgs>(args?: SelectSubset<T, VoloFindFirstArgs<ExtArgs>>): Prisma__VoloClient<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Volo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoloFindFirstOrThrowArgs} args - Arguments to find a Volo
     * @example
     * // Get one Volo
     * const volo = await prisma.volo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoloFindFirstOrThrowArgs>(args?: SelectSubset<T, VoloFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoloClient<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Volos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoloFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Volos
     * const volos = await prisma.volo.findMany()
     * 
     * // Get first 10 Volos
     * const volos = await prisma.volo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voloWithIdOnly = await prisma.volo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoloFindManyArgs>(args?: SelectSubset<T, VoloFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Volo.
     * @param {VoloCreateArgs} args - Arguments to create a Volo.
     * @example
     * // Create one Volo
     * const Volo = await prisma.volo.create({
     *   data: {
     *     // ... data to create a Volo
     *   }
     * })
     * 
     */
    create<T extends VoloCreateArgs>(args: SelectSubset<T, VoloCreateArgs<ExtArgs>>): Prisma__VoloClient<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Volos.
     * @param {VoloCreateManyArgs} args - Arguments to create many Volos.
     * @example
     * // Create many Volos
     * const volo = await prisma.volo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoloCreateManyArgs>(args?: SelectSubset<T, VoloCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Volos and returns the data saved in the database.
     * @param {VoloCreateManyAndReturnArgs} args - Arguments to create many Volos.
     * @example
     * // Create many Volos
     * const volo = await prisma.volo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Volos and only return the `id`
     * const voloWithIdOnly = await prisma.volo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoloCreateManyAndReturnArgs>(args?: SelectSubset<T, VoloCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Volo.
     * @param {VoloDeleteArgs} args - Arguments to delete one Volo.
     * @example
     * // Delete one Volo
     * const Volo = await prisma.volo.delete({
     *   where: {
     *     // ... filter to delete one Volo
     *   }
     * })
     * 
     */
    delete<T extends VoloDeleteArgs>(args: SelectSubset<T, VoloDeleteArgs<ExtArgs>>): Prisma__VoloClient<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Volo.
     * @param {VoloUpdateArgs} args - Arguments to update one Volo.
     * @example
     * // Update one Volo
     * const volo = await prisma.volo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoloUpdateArgs>(args: SelectSubset<T, VoloUpdateArgs<ExtArgs>>): Prisma__VoloClient<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Volos.
     * @param {VoloDeleteManyArgs} args - Arguments to filter Volos to delete.
     * @example
     * // Delete a few Volos
     * const { count } = await prisma.volo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoloDeleteManyArgs>(args?: SelectSubset<T, VoloDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Volos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoloUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Volos
     * const volo = await prisma.volo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoloUpdateManyArgs>(args: SelectSubset<T, VoloUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Volos and returns the data updated in the database.
     * @param {VoloUpdateManyAndReturnArgs} args - Arguments to update many Volos.
     * @example
     * // Update many Volos
     * const volo = await prisma.volo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Volos and only return the `id`
     * const voloWithIdOnly = await prisma.volo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoloUpdateManyAndReturnArgs>(args: SelectSubset<T, VoloUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Volo.
     * @param {VoloUpsertArgs} args - Arguments to update or create a Volo.
     * @example
     * // Update or create a Volo
     * const volo = await prisma.volo.upsert({
     *   create: {
     *     // ... data to create a Volo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Volo we want to update
     *   }
     * })
     */
    upsert<T extends VoloUpsertArgs>(args: SelectSubset<T, VoloUpsertArgs<ExtArgs>>): Prisma__VoloClient<$Result.GetResult<Prisma.$VoloPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Volos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoloCountArgs} args - Arguments to filter Volos to count.
     * @example
     * // Count the number of Volos
     * const count = await prisma.volo.count({
     *   where: {
     *     // ... the filter for the Volos we want to count
     *   }
     * })
    **/
    count<T extends VoloCountArgs>(
      args?: Subset<T, VoloCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoloCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Volo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoloAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoloAggregateArgs>(args: Subset<T, VoloAggregateArgs>): Prisma.PrismaPromise<GetVoloAggregateType<T>>

    /**
     * Group by Volo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoloGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoloGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoloGroupByArgs['orderBy'] }
        : { orderBy?: VoloGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoloGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoloGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Volo model
   */
  readonly fields: VoloFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Volo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoloClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preventivo<T extends PreventivoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PreventivoDefaultArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fornitore<T extends Volo$fornitoreArgs<ExtArgs> = {}>(args?: Subset<T, Volo$fornitoreArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Volo model
   */
  interface VoloFieldRefs {
    readonly id: FieldRef<"Volo", 'String'>
    readonly id_preventivo: FieldRef<"Volo", 'String'>
    readonly id_fornitore: FieldRef<"Volo", 'String'>
    readonly compagnia_aerea: FieldRef<"Volo", 'String'>
    readonly descrizione: FieldRef<"Volo", 'String'>
    readonly data_partenza: FieldRef<"Volo", 'DateTime'>
    readonly data_arrivo: FieldRef<"Volo", 'DateTime'>
    readonly totale: FieldRef<"Volo", 'Float'>
    readonly ricarico: FieldRef<"Volo", 'Float'>
    readonly numero: FieldRef<"Volo", 'Int'>
    readonly valuta: FieldRef<"Volo", 'String'>
    readonly cambio: FieldRef<"Volo", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Volo findUnique
   */
  export type VoloFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * Filter, which Volo to fetch.
     */
    where: VoloWhereUniqueInput
  }

  /**
   * Volo findUniqueOrThrow
   */
  export type VoloFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * Filter, which Volo to fetch.
     */
    where: VoloWhereUniqueInput
  }

  /**
   * Volo findFirst
   */
  export type VoloFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * Filter, which Volo to fetch.
     */
    where?: VoloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Volos to fetch.
     */
    orderBy?: VoloOrderByWithRelationInput | VoloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Volos.
     */
    cursor?: VoloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Volos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Volos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Volos.
     */
    distinct?: VoloScalarFieldEnum | VoloScalarFieldEnum[]
  }

  /**
   * Volo findFirstOrThrow
   */
  export type VoloFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * Filter, which Volo to fetch.
     */
    where?: VoloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Volos to fetch.
     */
    orderBy?: VoloOrderByWithRelationInput | VoloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Volos.
     */
    cursor?: VoloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Volos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Volos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Volos.
     */
    distinct?: VoloScalarFieldEnum | VoloScalarFieldEnum[]
  }

  /**
   * Volo findMany
   */
  export type VoloFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * Filter, which Volos to fetch.
     */
    where?: VoloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Volos to fetch.
     */
    orderBy?: VoloOrderByWithRelationInput | VoloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Volos.
     */
    cursor?: VoloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Volos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Volos.
     */
    skip?: number
    distinct?: VoloScalarFieldEnum | VoloScalarFieldEnum[]
  }

  /**
   * Volo create
   */
  export type VoloCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * The data needed to create a Volo.
     */
    data: XOR<VoloCreateInput, VoloUncheckedCreateInput>
  }

  /**
   * Volo createMany
   */
  export type VoloCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Volos.
     */
    data: VoloCreateManyInput | VoloCreateManyInput[]
  }

  /**
   * Volo createManyAndReturn
   */
  export type VoloCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * The data used to create many Volos.
     */
    data: VoloCreateManyInput | VoloCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Volo update
   */
  export type VoloUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * The data needed to update a Volo.
     */
    data: XOR<VoloUpdateInput, VoloUncheckedUpdateInput>
    /**
     * Choose, which Volo to update.
     */
    where: VoloWhereUniqueInput
  }

  /**
   * Volo updateMany
   */
  export type VoloUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Volos.
     */
    data: XOR<VoloUpdateManyMutationInput, VoloUncheckedUpdateManyInput>
    /**
     * Filter which Volos to update
     */
    where?: VoloWhereInput
    /**
     * Limit how many Volos to update.
     */
    limit?: number
  }

  /**
   * Volo updateManyAndReturn
   */
  export type VoloUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * The data used to update Volos.
     */
    data: XOR<VoloUpdateManyMutationInput, VoloUncheckedUpdateManyInput>
    /**
     * Filter which Volos to update
     */
    where?: VoloWhereInput
    /**
     * Limit how many Volos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Volo upsert
   */
  export type VoloUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * The filter to search for the Volo to update in case it exists.
     */
    where: VoloWhereUniqueInput
    /**
     * In case the Volo found by the `where` argument doesn't exist, create a new Volo with this data.
     */
    create: XOR<VoloCreateInput, VoloUncheckedCreateInput>
    /**
     * In case the Volo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoloUpdateInput, VoloUncheckedUpdateInput>
  }

  /**
   * Volo delete
   */
  export type VoloDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
    /**
     * Filter which Volo to delete.
     */
    where: VoloWhereUniqueInput
  }

  /**
   * Volo deleteMany
   */
  export type VoloDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Volos to delete
     */
    where?: VoloWhereInput
    /**
     * Limit how many Volos to delete.
     */
    limit?: number
  }

  /**
   * Volo.fornitore
   */
  export type Volo$fornitoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    where?: FornitoreWhereInput
  }

  /**
   * Volo without action
   */
  export type VoloDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volo
     */
    select?: VoloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volo
     */
    omit?: VoloOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoloInclude<ExtArgs> | null
  }


  /**
   * Model Assicurazione
   */

  export type AggregateAssicurazione = {
    _count: AssicurazioneCountAggregateOutputType | null
    _avg: AssicurazioneAvgAggregateOutputType | null
    _sum: AssicurazioneSumAggregateOutputType | null
    _min: AssicurazioneMinAggregateOutputType | null
    _max: AssicurazioneMaxAggregateOutputType | null
  }

  export type AssicurazioneAvgAggregateOutputType = {
    netto: number | null
    ricarico: number | null
    numero: number | null
  }

  export type AssicurazioneSumAggregateOutputType = {
    netto: number | null
    ricarico: number | null
    numero: number | null
  }

  export type AssicurazioneMinAggregateOutputType = {
    id: string | null
    id_preventivo: string | null
    id_fornitore: string | null
    assicurazione: string | null
    netto: number | null
    ricarico: number | null
    numero: number | null
  }

  export type AssicurazioneMaxAggregateOutputType = {
    id: string | null
    id_preventivo: string | null
    id_fornitore: string | null
    assicurazione: string | null
    netto: number | null
    ricarico: number | null
    numero: number | null
  }

  export type AssicurazioneCountAggregateOutputType = {
    id: number
    id_preventivo: number
    id_fornitore: number
    assicurazione: number
    netto: number
    ricarico: number
    numero: number
    _all: number
  }


  export type AssicurazioneAvgAggregateInputType = {
    netto?: true
    ricarico?: true
    numero?: true
  }

  export type AssicurazioneSumAggregateInputType = {
    netto?: true
    ricarico?: true
    numero?: true
  }

  export type AssicurazioneMinAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    assicurazione?: true
    netto?: true
    ricarico?: true
    numero?: true
  }

  export type AssicurazioneMaxAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    assicurazione?: true
    netto?: true
    ricarico?: true
    numero?: true
  }

  export type AssicurazioneCountAggregateInputType = {
    id?: true
    id_preventivo?: true
    id_fornitore?: true
    assicurazione?: true
    netto?: true
    ricarico?: true
    numero?: true
    _all?: true
  }

  export type AssicurazioneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assicurazione to aggregate.
     */
    where?: AssicurazioneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assicuraziones to fetch.
     */
    orderBy?: AssicurazioneOrderByWithRelationInput | AssicurazioneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssicurazioneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assicuraziones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assicuraziones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assicuraziones
    **/
    _count?: true | AssicurazioneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssicurazioneAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssicurazioneSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssicurazioneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssicurazioneMaxAggregateInputType
  }

  export type GetAssicurazioneAggregateType<T extends AssicurazioneAggregateArgs> = {
        [P in keyof T & keyof AggregateAssicurazione]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssicurazione[P]>
      : GetScalarType<T[P], AggregateAssicurazione[P]>
  }




  export type AssicurazioneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssicurazioneWhereInput
    orderBy?: AssicurazioneOrderByWithAggregationInput | AssicurazioneOrderByWithAggregationInput[]
    by: AssicurazioneScalarFieldEnum[] | AssicurazioneScalarFieldEnum
    having?: AssicurazioneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssicurazioneCountAggregateInputType | true
    _avg?: AssicurazioneAvgAggregateInputType
    _sum?: AssicurazioneSumAggregateInputType
    _min?: AssicurazioneMinAggregateInputType
    _max?: AssicurazioneMaxAggregateInputType
  }

  export type AssicurazioneGroupByOutputType = {
    id: string
    id_preventivo: string
    id_fornitore: string | null
    assicurazione: string | null
    netto: number | null
    ricarico: number | null
    numero: number | null
    _count: AssicurazioneCountAggregateOutputType | null
    _avg: AssicurazioneAvgAggregateOutputType | null
    _sum: AssicurazioneSumAggregateOutputType | null
    _min: AssicurazioneMinAggregateOutputType | null
    _max: AssicurazioneMaxAggregateOutputType | null
  }

  type GetAssicurazioneGroupByPayload<T extends AssicurazioneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssicurazioneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssicurazioneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssicurazioneGroupByOutputType[P]>
            : GetScalarType<T[P], AssicurazioneGroupByOutputType[P]>
        }
      >
    >


  export type AssicurazioneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    assicurazione?: boolean
    netto?: boolean
    ricarico?: boolean
    numero?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Assicurazione$fornitoreArgs<ExtArgs>
  }, ExtArgs["result"]["assicurazione"]>

  export type AssicurazioneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    assicurazione?: boolean
    netto?: boolean
    ricarico?: boolean
    numero?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Assicurazione$fornitoreArgs<ExtArgs>
  }, ExtArgs["result"]["assicurazione"]>

  export type AssicurazioneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    assicurazione?: boolean
    netto?: boolean
    ricarico?: boolean
    numero?: boolean
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Assicurazione$fornitoreArgs<ExtArgs>
  }, ExtArgs["result"]["assicurazione"]>

  export type AssicurazioneSelectScalar = {
    id?: boolean
    id_preventivo?: boolean
    id_fornitore?: boolean
    assicurazione?: boolean
    netto?: boolean
    ricarico?: boolean
    numero?: boolean
  }

  export type AssicurazioneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_preventivo" | "id_fornitore" | "assicurazione" | "netto" | "ricarico" | "numero", ExtArgs["result"]["assicurazione"]>
  export type AssicurazioneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Assicurazione$fornitoreArgs<ExtArgs>
  }
  export type AssicurazioneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Assicurazione$fornitoreArgs<ExtArgs>
  }
  export type AssicurazioneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoDefaultArgs<ExtArgs>
    fornitore?: boolean | Assicurazione$fornitoreArgs<ExtArgs>
  }

  export type $AssicurazionePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assicurazione"
    objects: {
      preventivo: Prisma.$PreventivoPayload<ExtArgs>
      fornitore: Prisma.$FornitorePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      id_preventivo: string
      id_fornitore: string | null
      assicurazione: string | null
      netto: number | null
      ricarico: number | null
      numero: number | null
    }, ExtArgs["result"]["assicurazione"]>
    composites: {}
  }

  type AssicurazioneGetPayload<S extends boolean | null | undefined | AssicurazioneDefaultArgs> = $Result.GetResult<Prisma.$AssicurazionePayload, S>

  type AssicurazioneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssicurazioneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssicurazioneCountAggregateInputType | true
    }

  export interface AssicurazioneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assicurazione'], meta: { name: 'Assicurazione' } }
    /**
     * Find zero or one Assicurazione that matches the filter.
     * @param {AssicurazioneFindUniqueArgs} args - Arguments to find a Assicurazione
     * @example
     * // Get one Assicurazione
     * const assicurazione = await prisma.assicurazione.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssicurazioneFindUniqueArgs>(args: SelectSubset<T, AssicurazioneFindUniqueArgs<ExtArgs>>): Prisma__AssicurazioneClient<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assicurazione that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssicurazioneFindUniqueOrThrowArgs} args - Arguments to find a Assicurazione
     * @example
     * // Get one Assicurazione
     * const assicurazione = await prisma.assicurazione.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssicurazioneFindUniqueOrThrowArgs>(args: SelectSubset<T, AssicurazioneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssicurazioneClient<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assicurazione that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssicurazioneFindFirstArgs} args - Arguments to find a Assicurazione
     * @example
     * // Get one Assicurazione
     * const assicurazione = await prisma.assicurazione.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssicurazioneFindFirstArgs>(args?: SelectSubset<T, AssicurazioneFindFirstArgs<ExtArgs>>): Prisma__AssicurazioneClient<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assicurazione that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssicurazioneFindFirstOrThrowArgs} args - Arguments to find a Assicurazione
     * @example
     * // Get one Assicurazione
     * const assicurazione = await prisma.assicurazione.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssicurazioneFindFirstOrThrowArgs>(args?: SelectSubset<T, AssicurazioneFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssicurazioneClient<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assicuraziones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssicurazioneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assicuraziones
     * const assicuraziones = await prisma.assicurazione.findMany()
     * 
     * // Get first 10 Assicuraziones
     * const assicuraziones = await prisma.assicurazione.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assicurazioneWithIdOnly = await prisma.assicurazione.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssicurazioneFindManyArgs>(args?: SelectSubset<T, AssicurazioneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assicurazione.
     * @param {AssicurazioneCreateArgs} args - Arguments to create a Assicurazione.
     * @example
     * // Create one Assicurazione
     * const Assicurazione = await prisma.assicurazione.create({
     *   data: {
     *     // ... data to create a Assicurazione
     *   }
     * })
     * 
     */
    create<T extends AssicurazioneCreateArgs>(args: SelectSubset<T, AssicurazioneCreateArgs<ExtArgs>>): Prisma__AssicurazioneClient<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assicuraziones.
     * @param {AssicurazioneCreateManyArgs} args - Arguments to create many Assicuraziones.
     * @example
     * // Create many Assicuraziones
     * const assicurazione = await prisma.assicurazione.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssicurazioneCreateManyArgs>(args?: SelectSubset<T, AssicurazioneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assicuraziones and returns the data saved in the database.
     * @param {AssicurazioneCreateManyAndReturnArgs} args - Arguments to create many Assicuraziones.
     * @example
     * // Create many Assicuraziones
     * const assicurazione = await prisma.assicurazione.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assicuraziones and only return the `id`
     * const assicurazioneWithIdOnly = await prisma.assicurazione.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssicurazioneCreateManyAndReturnArgs>(args?: SelectSubset<T, AssicurazioneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assicurazione.
     * @param {AssicurazioneDeleteArgs} args - Arguments to delete one Assicurazione.
     * @example
     * // Delete one Assicurazione
     * const Assicurazione = await prisma.assicurazione.delete({
     *   where: {
     *     // ... filter to delete one Assicurazione
     *   }
     * })
     * 
     */
    delete<T extends AssicurazioneDeleteArgs>(args: SelectSubset<T, AssicurazioneDeleteArgs<ExtArgs>>): Prisma__AssicurazioneClient<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assicurazione.
     * @param {AssicurazioneUpdateArgs} args - Arguments to update one Assicurazione.
     * @example
     * // Update one Assicurazione
     * const assicurazione = await prisma.assicurazione.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssicurazioneUpdateArgs>(args: SelectSubset<T, AssicurazioneUpdateArgs<ExtArgs>>): Prisma__AssicurazioneClient<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assicuraziones.
     * @param {AssicurazioneDeleteManyArgs} args - Arguments to filter Assicuraziones to delete.
     * @example
     * // Delete a few Assicuraziones
     * const { count } = await prisma.assicurazione.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssicurazioneDeleteManyArgs>(args?: SelectSubset<T, AssicurazioneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assicuraziones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssicurazioneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assicuraziones
     * const assicurazione = await prisma.assicurazione.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssicurazioneUpdateManyArgs>(args: SelectSubset<T, AssicurazioneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assicuraziones and returns the data updated in the database.
     * @param {AssicurazioneUpdateManyAndReturnArgs} args - Arguments to update many Assicuraziones.
     * @example
     * // Update many Assicuraziones
     * const assicurazione = await prisma.assicurazione.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assicuraziones and only return the `id`
     * const assicurazioneWithIdOnly = await prisma.assicurazione.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssicurazioneUpdateManyAndReturnArgs>(args: SelectSubset<T, AssicurazioneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assicurazione.
     * @param {AssicurazioneUpsertArgs} args - Arguments to update or create a Assicurazione.
     * @example
     * // Update or create a Assicurazione
     * const assicurazione = await prisma.assicurazione.upsert({
     *   create: {
     *     // ... data to create a Assicurazione
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assicurazione we want to update
     *   }
     * })
     */
    upsert<T extends AssicurazioneUpsertArgs>(args: SelectSubset<T, AssicurazioneUpsertArgs<ExtArgs>>): Prisma__AssicurazioneClient<$Result.GetResult<Prisma.$AssicurazionePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assicuraziones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssicurazioneCountArgs} args - Arguments to filter Assicuraziones to count.
     * @example
     * // Count the number of Assicuraziones
     * const count = await prisma.assicurazione.count({
     *   where: {
     *     // ... the filter for the Assicuraziones we want to count
     *   }
     * })
    **/
    count<T extends AssicurazioneCountArgs>(
      args?: Subset<T, AssicurazioneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssicurazioneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assicurazione.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssicurazioneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssicurazioneAggregateArgs>(args: Subset<T, AssicurazioneAggregateArgs>): Prisma.PrismaPromise<GetAssicurazioneAggregateType<T>>

    /**
     * Group by Assicurazione.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssicurazioneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssicurazioneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssicurazioneGroupByArgs['orderBy'] }
        : { orderBy?: AssicurazioneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssicurazioneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssicurazioneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assicurazione model
   */
  readonly fields: AssicurazioneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assicurazione.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssicurazioneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preventivo<T extends PreventivoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PreventivoDefaultArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fornitore<T extends Assicurazione$fornitoreArgs<ExtArgs> = {}>(args?: Subset<T, Assicurazione$fornitoreArgs<ExtArgs>>): Prisma__FornitoreClient<$Result.GetResult<Prisma.$FornitorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assicurazione model
   */
  interface AssicurazioneFieldRefs {
    readonly id: FieldRef<"Assicurazione", 'String'>
    readonly id_preventivo: FieldRef<"Assicurazione", 'String'>
    readonly id_fornitore: FieldRef<"Assicurazione", 'String'>
    readonly assicurazione: FieldRef<"Assicurazione", 'String'>
    readonly netto: FieldRef<"Assicurazione", 'Float'>
    readonly ricarico: FieldRef<"Assicurazione", 'Float'>
    readonly numero: FieldRef<"Assicurazione", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Assicurazione findUnique
   */
  export type AssicurazioneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * Filter, which Assicurazione to fetch.
     */
    where: AssicurazioneWhereUniqueInput
  }

  /**
   * Assicurazione findUniqueOrThrow
   */
  export type AssicurazioneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * Filter, which Assicurazione to fetch.
     */
    where: AssicurazioneWhereUniqueInput
  }

  /**
   * Assicurazione findFirst
   */
  export type AssicurazioneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * Filter, which Assicurazione to fetch.
     */
    where?: AssicurazioneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assicuraziones to fetch.
     */
    orderBy?: AssicurazioneOrderByWithRelationInput | AssicurazioneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assicuraziones.
     */
    cursor?: AssicurazioneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assicuraziones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assicuraziones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assicuraziones.
     */
    distinct?: AssicurazioneScalarFieldEnum | AssicurazioneScalarFieldEnum[]
  }

  /**
   * Assicurazione findFirstOrThrow
   */
  export type AssicurazioneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * Filter, which Assicurazione to fetch.
     */
    where?: AssicurazioneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assicuraziones to fetch.
     */
    orderBy?: AssicurazioneOrderByWithRelationInput | AssicurazioneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assicuraziones.
     */
    cursor?: AssicurazioneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assicuraziones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assicuraziones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assicuraziones.
     */
    distinct?: AssicurazioneScalarFieldEnum | AssicurazioneScalarFieldEnum[]
  }

  /**
   * Assicurazione findMany
   */
  export type AssicurazioneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * Filter, which Assicuraziones to fetch.
     */
    where?: AssicurazioneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assicuraziones to fetch.
     */
    orderBy?: AssicurazioneOrderByWithRelationInput | AssicurazioneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assicuraziones.
     */
    cursor?: AssicurazioneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assicuraziones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assicuraziones.
     */
    skip?: number
    distinct?: AssicurazioneScalarFieldEnum | AssicurazioneScalarFieldEnum[]
  }

  /**
   * Assicurazione create
   */
  export type AssicurazioneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * The data needed to create a Assicurazione.
     */
    data: XOR<AssicurazioneCreateInput, AssicurazioneUncheckedCreateInput>
  }

  /**
   * Assicurazione createMany
   */
  export type AssicurazioneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assicuraziones.
     */
    data: AssicurazioneCreateManyInput | AssicurazioneCreateManyInput[]
  }

  /**
   * Assicurazione createManyAndReturn
   */
  export type AssicurazioneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * The data used to create many Assicuraziones.
     */
    data: AssicurazioneCreateManyInput | AssicurazioneCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assicurazione update
   */
  export type AssicurazioneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * The data needed to update a Assicurazione.
     */
    data: XOR<AssicurazioneUpdateInput, AssicurazioneUncheckedUpdateInput>
    /**
     * Choose, which Assicurazione to update.
     */
    where: AssicurazioneWhereUniqueInput
  }

  /**
   * Assicurazione updateMany
   */
  export type AssicurazioneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assicuraziones.
     */
    data: XOR<AssicurazioneUpdateManyMutationInput, AssicurazioneUncheckedUpdateManyInput>
    /**
     * Filter which Assicuraziones to update
     */
    where?: AssicurazioneWhereInput
    /**
     * Limit how many Assicuraziones to update.
     */
    limit?: number
  }

  /**
   * Assicurazione updateManyAndReturn
   */
  export type AssicurazioneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * The data used to update Assicuraziones.
     */
    data: XOR<AssicurazioneUpdateManyMutationInput, AssicurazioneUncheckedUpdateManyInput>
    /**
     * Filter which Assicuraziones to update
     */
    where?: AssicurazioneWhereInput
    /**
     * Limit how many Assicuraziones to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assicurazione upsert
   */
  export type AssicurazioneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * The filter to search for the Assicurazione to update in case it exists.
     */
    where: AssicurazioneWhereUniqueInput
    /**
     * In case the Assicurazione found by the `where` argument doesn't exist, create a new Assicurazione with this data.
     */
    create: XOR<AssicurazioneCreateInput, AssicurazioneUncheckedCreateInput>
    /**
     * In case the Assicurazione was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssicurazioneUpdateInput, AssicurazioneUncheckedUpdateInput>
  }

  /**
   * Assicurazione delete
   */
  export type AssicurazioneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
    /**
     * Filter which Assicurazione to delete.
     */
    where: AssicurazioneWhereUniqueInput
  }

  /**
   * Assicurazione deleteMany
   */
  export type AssicurazioneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assicuraziones to delete
     */
    where?: AssicurazioneWhereInput
    /**
     * Limit how many Assicuraziones to delete.
     */
    limit?: number
  }

  /**
   * Assicurazione.fornitore
   */
  export type Assicurazione$fornitoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fornitore
     */
    select?: FornitoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fornitore
     */
    omit?: FornitoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FornitoreInclude<ExtArgs> | null
    where?: FornitoreWhereInput
  }

  /**
   * Assicurazione without action
   */
  export type AssicurazioneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assicurazione
     */
    select?: AssicurazioneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assicurazione
     */
    omit?: AssicurazioneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssicurazioneInclude<ExtArgs> | null
  }


  /**
   * Model PreventivoAlCliente
   */

  export type AggregatePreventivoAlCliente = {
    _count: PreventivoAlClienteCountAggregateOutputType | null
    _min: PreventivoAlClienteMinAggregateOutputType | null
    _max: PreventivoAlClienteMaxAggregateOutputType | null
  }

  export type PreventivoAlClienteMinAggregateOutputType = {
    id: string | null
    id_preventivo: string | null
    descrizione_viaggio: string | null
  }

  export type PreventivoAlClienteMaxAggregateOutputType = {
    id: string | null
    id_preventivo: string | null
    descrizione_viaggio: string | null
  }

  export type PreventivoAlClienteCountAggregateOutputType = {
    id: number
    id_preventivo: number
    descrizione_viaggio: number
    _all: number
  }


  export type PreventivoAlClienteMinAggregateInputType = {
    id?: true
    id_preventivo?: true
    descrizione_viaggio?: true
  }

  export type PreventivoAlClienteMaxAggregateInputType = {
    id?: true
    id_preventivo?: true
    descrizione_viaggio?: true
  }

  export type PreventivoAlClienteCountAggregateInputType = {
    id?: true
    id_preventivo?: true
    descrizione_viaggio?: true
    _all?: true
  }

  export type PreventivoAlClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreventivoAlCliente to aggregate.
     */
    where?: PreventivoAlClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivoAlClientes to fetch.
     */
    orderBy?: PreventivoAlClienteOrderByWithRelationInput | PreventivoAlClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreventivoAlClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivoAlClientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivoAlClientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreventivoAlClientes
    **/
    _count?: true | PreventivoAlClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreventivoAlClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreventivoAlClienteMaxAggregateInputType
  }

  export type GetPreventivoAlClienteAggregateType<T extends PreventivoAlClienteAggregateArgs> = {
        [P in keyof T & keyof AggregatePreventivoAlCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreventivoAlCliente[P]>
      : GetScalarType<T[P], AggregatePreventivoAlCliente[P]>
  }




  export type PreventivoAlClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreventivoAlClienteWhereInput
    orderBy?: PreventivoAlClienteOrderByWithAggregationInput | PreventivoAlClienteOrderByWithAggregationInput[]
    by: PreventivoAlClienteScalarFieldEnum[] | PreventivoAlClienteScalarFieldEnum
    having?: PreventivoAlClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreventivoAlClienteCountAggregateInputType | true
    _min?: PreventivoAlClienteMinAggregateInputType
    _max?: PreventivoAlClienteMaxAggregateInputType
  }

  export type PreventivoAlClienteGroupByOutputType = {
    id: string
    id_preventivo: string | null
    descrizione_viaggio: string | null
    _count: PreventivoAlClienteCountAggregateOutputType | null
    _min: PreventivoAlClienteMinAggregateOutputType | null
    _max: PreventivoAlClienteMaxAggregateOutputType | null
  }

  type GetPreventivoAlClienteGroupByPayload<T extends PreventivoAlClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreventivoAlClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreventivoAlClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreventivoAlClienteGroupByOutputType[P]>
            : GetScalarType<T[P], PreventivoAlClienteGroupByOutputType[P]>
        }
      >
    >


  export type PreventivoAlClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    descrizione_viaggio?: boolean
    preventivo?: boolean | PreventivoAlCliente$preventivoArgs<ExtArgs>
    rows?: boolean | PreventivoAlCliente$rowsArgs<ExtArgs>
    _count?: boolean | PreventivoAlClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preventivoAlCliente"]>

  export type PreventivoAlClienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    descrizione_viaggio?: boolean
    preventivo?: boolean | PreventivoAlCliente$preventivoArgs<ExtArgs>
  }, ExtArgs["result"]["preventivoAlCliente"]>

  export type PreventivoAlClienteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo?: boolean
    descrizione_viaggio?: boolean
    preventivo?: boolean | PreventivoAlCliente$preventivoArgs<ExtArgs>
  }, ExtArgs["result"]["preventivoAlCliente"]>

  export type PreventivoAlClienteSelectScalar = {
    id?: boolean
    id_preventivo?: boolean
    descrizione_viaggio?: boolean
  }

  export type PreventivoAlClienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_preventivo" | "descrizione_viaggio", ExtArgs["result"]["preventivoAlCliente"]>
  export type PreventivoAlClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoAlCliente$preventivoArgs<ExtArgs>
    rows?: boolean | PreventivoAlCliente$rowsArgs<ExtArgs>
    _count?: boolean | PreventivoAlClienteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PreventivoAlClienteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoAlCliente$preventivoArgs<ExtArgs>
  }
  export type PreventivoAlClienteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivo?: boolean | PreventivoAlCliente$preventivoArgs<ExtArgs>
  }

  export type $PreventivoAlClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreventivoAlCliente"
    objects: {
      preventivo: Prisma.$PreventivoPayload<ExtArgs> | null
      rows: Prisma.$PreventivoAlClienteRowPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      id_preventivo: string | null
      descrizione_viaggio: string | null
    }, ExtArgs["result"]["preventivoAlCliente"]>
    composites: {}
  }

  type PreventivoAlClienteGetPayload<S extends boolean | null | undefined | PreventivoAlClienteDefaultArgs> = $Result.GetResult<Prisma.$PreventivoAlClientePayload, S>

  type PreventivoAlClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreventivoAlClienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreventivoAlClienteCountAggregateInputType | true
    }

  export interface PreventivoAlClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PreventivoAlCliente'], meta: { name: 'PreventivoAlCliente' } }
    /**
     * Find zero or one PreventivoAlCliente that matches the filter.
     * @param {PreventivoAlClienteFindUniqueArgs} args - Arguments to find a PreventivoAlCliente
     * @example
     * // Get one PreventivoAlCliente
     * const preventivoAlCliente = await prisma.preventivoAlCliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreventivoAlClienteFindUniqueArgs>(args: SelectSubset<T, PreventivoAlClienteFindUniqueArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PreventivoAlCliente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreventivoAlClienteFindUniqueOrThrowArgs} args - Arguments to find a PreventivoAlCliente
     * @example
     * // Get one PreventivoAlCliente
     * const preventivoAlCliente = await prisma.preventivoAlCliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreventivoAlClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, PreventivoAlClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreventivoAlCliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteFindFirstArgs} args - Arguments to find a PreventivoAlCliente
     * @example
     * // Get one PreventivoAlCliente
     * const preventivoAlCliente = await prisma.preventivoAlCliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreventivoAlClienteFindFirstArgs>(args?: SelectSubset<T, PreventivoAlClienteFindFirstArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreventivoAlCliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteFindFirstOrThrowArgs} args - Arguments to find a PreventivoAlCliente
     * @example
     * // Get one PreventivoAlCliente
     * const preventivoAlCliente = await prisma.preventivoAlCliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreventivoAlClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, PreventivoAlClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PreventivoAlClientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreventivoAlClientes
     * const preventivoAlClientes = await prisma.preventivoAlCliente.findMany()
     * 
     * // Get first 10 PreventivoAlClientes
     * const preventivoAlClientes = await prisma.preventivoAlCliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preventivoAlClienteWithIdOnly = await prisma.preventivoAlCliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreventivoAlClienteFindManyArgs>(args?: SelectSubset<T, PreventivoAlClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PreventivoAlCliente.
     * @param {PreventivoAlClienteCreateArgs} args - Arguments to create a PreventivoAlCliente.
     * @example
     * // Create one PreventivoAlCliente
     * const PreventivoAlCliente = await prisma.preventivoAlCliente.create({
     *   data: {
     *     // ... data to create a PreventivoAlCliente
     *   }
     * })
     * 
     */
    create<T extends PreventivoAlClienteCreateArgs>(args: SelectSubset<T, PreventivoAlClienteCreateArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PreventivoAlClientes.
     * @param {PreventivoAlClienteCreateManyArgs} args - Arguments to create many PreventivoAlClientes.
     * @example
     * // Create many PreventivoAlClientes
     * const preventivoAlCliente = await prisma.preventivoAlCliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreventivoAlClienteCreateManyArgs>(args?: SelectSubset<T, PreventivoAlClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PreventivoAlClientes and returns the data saved in the database.
     * @param {PreventivoAlClienteCreateManyAndReturnArgs} args - Arguments to create many PreventivoAlClientes.
     * @example
     * // Create many PreventivoAlClientes
     * const preventivoAlCliente = await prisma.preventivoAlCliente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PreventivoAlClientes and only return the `id`
     * const preventivoAlClienteWithIdOnly = await prisma.preventivoAlCliente.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreventivoAlClienteCreateManyAndReturnArgs>(args?: SelectSubset<T, PreventivoAlClienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PreventivoAlCliente.
     * @param {PreventivoAlClienteDeleteArgs} args - Arguments to delete one PreventivoAlCliente.
     * @example
     * // Delete one PreventivoAlCliente
     * const PreventivoAlCliente = await prisma.preventivoAlCliente.delete({
     *   where: {
     *     // ... filter to delete one PreventivoAlCliente
     *   }
     * })
     * 
     */
    delete<T extends PreventivoAlClienteDeleteArgs>(args: SelectSubset<T, PreventivoAlClienteDeleteArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PreventivoAlCliente.
     * @param {PreventivoAlClienteUpdateArgs} args - Arguments to update one PreventivoAlCliente.
     * @example
     * // Update one PreventivoAlCliente
     * const preventivoAlCliente = await prisma.preventivoAlCliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreventivoAlClienteUpdateArgs>(args: SelectSubset<T, PreventivoAlClienteUpdateArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PreventivoAlClientes.
     * @param {PreventivoAlClienteDeleteManyArgs} args - Arguments to filter PreventivoAlClientes to delete.
     * @example
     * // Delete a few PreventivoAlClientes
     * const { count } = await prisma.preventivoAlCliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreventivoAlClienteDeleteManyArgs>(args?: SelectSubset<T, PreventivoAlClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreventivoAlClientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreventivoAlClientes
     * const preventivoAlCliente = await prisma.preventivoAlCliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreventivoAlClienteUpdateManyArgs>(args: SelectSubset<T, PreventivoAlClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreventivoAlClientes and returns the data updated in the database.
     * @param {PreventivoAlClienteUpdateManyAndReturnArgs} args - Arguments to update many PreventivoAlClientes.
     * @example
     * // Update many PreventivoAlClientes
     * const preventivoAlCliente = await prisma.preventivoAlCliente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PreventivoAlClientes and only return the `id`
     * const preventivoAlClienteWithIdOnly = await prisma.preventivoAlCliente.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PreventivoAlClienteUpdateManyAndReturnArgs>(args: SelectSubset<T, PreventivoAlClienteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PreventivoAlCliente.
     * @param {PreventivoAlClienteUpsertArgs} args - Arguments to update or create a PreventivoAlCliente.
     * @example
     * // Update or create a PreventivoAlCliente
     * const preventivoAlCliente = await prisma.preventivoAlCliente.upsert({
     *   create: {
     *     // ... data to create a PreventivoAlCliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreventivoAlCliente we want to update
     *   }
     * })
     */
    upsert<T extends PreventivoAlClienteUpsertArgs>(args: SelectSubset<T, PreventivoAlClienteUpsertArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PreventivoAlClientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteCountArgs} args - Arguments to filter PreventivoAlClientes to count.
     * @example
     * // Count the number of PreventivoAlClientes
     * const count = await prisma.preventivoAlCliente.count({
     *   where: {
     *     // ... the filter for the PreventivoAlClientes we want to count
     *   }
     * })
    **/
    count<T extends PreventivoAlClienteCountArgs>(
      args?: Subset<T, PreventivoAlClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreventivoAlClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreventivoAlCliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreventivoAlClienteAggregateArgs>(args: Subset<T, PreventivoAlClienteAggregateArgs>): Prisma.PrismaPromise<GetPreventivoAlClienteAggregateType<T>>

    /**
     * Group by PreventivoAlCliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreventivoAlClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreventivoAlClienteGroupByArgs['orderBy'] }
        : { orderBy?: PreventivoAlClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreventivoAlClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreventivoAlClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PreventivoAlCliente model
   */
  readonly fields: PreventivoAlClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PreventivoAlCliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreventivoAlClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preventivo<T extends PreventivoAlCliente$preventivoArgs<ExtArgs> = {}>(args?: Subset<T, PreventivoAlCliente$preventivoArgs<ExtArgs>>): Prisma__PreventivoClient<$Result.GetResult<Prisma.$PreventivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rows<T extends PreventivoAlCliente$rowsArgs<ExtArgs> = {}>(args?: Subset<T, PreventivoAlCliente$rowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PreventivoAlCliente model
   */
  interface PreventivoAlClienteFieldRefs {
    readonly id: FieldRef<"PreventivoAlCliente", 'String'>
    readonly id_preventivo: FieldRef<"PreventivoAlCliente", 'String'>
    readonly descrizione_viaggio: FieldRef<"PreventivoAlCliente", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PreventivoAlCliente findUnique
   */
  export type PreventivoAlClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlCliente to fetch.
     */
    where: PreventivoAlClienteWhereUniqueInput
  }

  /**
   * PreventivoAlCliente findUniqueOrThrow
   */
  export type PreventivoAlClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlCliente to fetch.
     */
    where: PreventivoAlClienteWhereUniqueInput
  }

  /**
   * PreventivoAlCliente findFirst
   */
  export type PreventivoAlClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlCliente to fetch.
     */
    where?: PreventivoAlClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivoAlClientes to fetch.
     */
    orderBy?: PreventivoAlClienteOrderByWithRelationInput | PreventivoAlClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventivoAlClientes.
     */
    cursor?: PreventivoAlClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivoAlClientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivoAlClientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventivoAlClientes.
     */
    distinct?: PreventivoAlClienteScalarFieldEnum | PreventivoAlClienteScalarFieldEnum[]
  }

  /**
   * PreventivoAlCliente findFirstOrThrow
   */
  export type PreventivoAlClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlCliente to fetch.
     */
    where?: PreventivoAlClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivoAlClientes to fetch.
     */
    orderBy?: PreventivoAlClienteOrderByWithRelationInput | PreventivoAlClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventivoAlClientes.
     */
    cursor?: PreventivoAlClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivoAlClientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivoAlClientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventivoAlClientes.
     */
    distinct?: PreventivoAlClienteScalarFieldEnum | PreventivoAlClienteScalarFieldEnum[]
  }

  /**
   * PreventivoAlCliente findMany
   */
  export type PreventivoAlClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlClientes to fetch.
     */
    where?: PreventivoAlClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivoAlClientes to fetch.
     */
    orderBy?: PreventivoAlClienteOrderByWithRelationInput | PreventivoAlClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreventivoAlClientes.
     */
    cursor?: PreventivoAlClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivoAlClientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivoAlClientes.
     */
    skip?: number
    distinct?: PreventivoAlClienteScalarFieldEnum | PreventivoAlClienteScalarFieldEnum[]
  }

  /**
   * PreventivoAlCliente create
   */
  export type PreventivoAlClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a PreventivoAlCliente.
     */
    data?: XOR<PreventivoAlClienteCreateInput, PreventivoAlClienteUncheckedCreateInput>
  }

  /**
   * PreventivoAlCliente createMany
   */
  export type PreventivoAlClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PreventivoAlClientes.
     */
    data: PreventivoAlClienteCreateManyInput | PreventivoAlClienteCreateManyInput[]
  }

  /**
   * PreventivoAlCliente createManyAndReturn
   */
  export type PreventivoAlClienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * The data used to create many PreventivoAlClientes.
     */
    data: PreventivoAlClienteCreateManyInput | PreventivoAlClienteCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PreventivoAlCliente update
   */
  export type PreventivoAlClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a PreventivoAlCliente.
     */
    data: XOR<PreventivoAlClienteUpdateInput, PreventivoAlClienteUncheckedUpdateInput>
    /**
     * Choose, which PreventivoAlCliente to update.
     */
    where: PreventivoAlClienteWhereUniqueInput
  }

  /**
   * PreventivoAlCliente updateMany
   */
  export type PreventivoAlClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PreventivoAlClientes.
     */
    data: XOR<PreventivoAlClienteUpdateManyMutationInput, PreventivoAlClienteUncheckedUpdateManyInput>
    /**
     * Filter which PreventivoAlClientes to update
     */
    where?: PreventivoAlClienteWhereInput
    /**
     * Limit how many PreventivoAlClientes to update.
     */
    limit?: number
  }

  /**
   * PreventivoAlCliente updateManyAndReturn
   */
  export type PreventivoAlClienteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * The data used to update PreventivoAlClientes.
     */
    data: XOR<PreventivoAlClienteUpdateManyMutationInput, PreventivoAlClienteUncheckedUpdateManyInput>
    /**
     * Filter which PreventivoAlClientes to update
     */
    where?: PreventivoAlClienteWhereInput
    /**
     * Limit how many PreventivoAlClientes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PreventivoAlCliente upsert
   */
  export type PreventivoAlClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the PreventivoAlCliente to update in case it exists.
     */
    where: PreventivoAlClienteWhereUniqueInput
    /**
     * In case the PreventivoAlCliente found by the `where` argument doesn't exist, create a new PreventivoAlCliente with this data.
     */
    create: XOR<PreventivoAlClienteCreateInput, PreventivoAlClienteUncheckedCreateInput>
    /**
     * In case the PreventivoAlCliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreventivoAlClienteUpdateInput, PreventivoAlClienteUncheckedUpdateInput>
  }

  /**
   * PreventivoAlCliente delete
   */
  export type PreventivoAlClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
    /**
     * Filter which PreventivoAlCliente to delete.
     */
    where: PreventivoAlClienteWhereUniqueInput
  }

  /**
   * PreventivoAlCliente deleteMany
   */
  export type PreventivoAlClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreventivoAlClientes to delete
     */
    where?: PreventivoAlClienteWhereInput
    /**
     * Limit how many PreventivoAlClientes to delete.
     */
    limit?: number
  }

  /**
   * PreventivoAlCliente.preventivo
   */
  export type PreventivoAlCliente$preventivoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preventivo
     */
    select?: PreventivoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preventivo
     */
    omit?: PreventivoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoInclude<ExtArgs> | null
    where?: PreventivoWhereInput
  }

  /**
   * PreventivoAlCliente.rows
   */
  export type PreventivoAlCliente$rowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    where?: PreventivoAlClienteRowWhereInput
    orderBy?: PreventivoAlClienteRowOrderByWithRelationInput | PreventivoAlClienteRowOrderByWithRelationInput[]
    cursor?: PreventivoAlClienteRowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreventivoAlClienteRowScalarFieldEnum | PreventivoAlClienteRowScalarFieldEnum[]
  }

  /**
   * PreventivoAlCliente without action
   */
  export type PreventivoAlClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlCliente
     */
    select?: PreventivoAlClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlCliente
     */
    omit?: PreventivoAlClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteInclude<ExtArgs> | null
  }


  /**
   * Model PreventivoAlClienteRow
   */

  export type AggregatePreventivoAlClienteRow = {
    _count: PreventivoAlClienteRowCountAggregateOutputType | null
    _avg: PreventivoAlClienteRowAvgAggregateOutputType | null
    _sum: PreventivoAlClienteRowSumAggregateOutputType | null
    _min: PreventivoAlClienteRowMinAggregateOutputType | null
    _max: PreventivoAlClienteRowMaxAggregateOutputType | null
  }

  export type PreventivoAlClienteRowAvgAggregateOutputType = {
    individuale: number | null
    numero: number | null
  }

  export type PreventivoAlClienteRowSumAggregateOutputType = {
    individuale: number | null
    numero: number | null
  }

  export type PreventivoAlClienteRowMinAggregateOutputType = {
    id: string | null
    id_preventivo_al_cliente: string | null
    senza_assicurazione: boolean | null
    destinazione: string | null
    descrizione: string | null
    individuale: number | null
    numero: number | null
  }

  export type PreventivoAlClienteRowMaxAggregateOutputType = {
    id: string | null
    id_preventivo_al_cliente: string | null
    senza_assicurazione: boolean | null
    destinazione: string | null
    descrizione: string | null
    individuale: number | null
    numero: number | null
  }

  export type PreventivoAlClienteRowCountAggregateOutputType = {
    id: number
    id_preventivo_al_cliente: number
    senza_assicurazione: number
    destinazione: number
    descrizione: number
    individuale: number
    numero: number
    _all: number
  }


  export type PreventivoAlClienteRowAvgAggregateInputType = {
    individuale?: true
    numero?: true
  }

  export type PreventivoAlClienteRowSumAggregateInputType = {
    individuale?: true
    numero?: true
  }

  export type PreventivoAlClienteRowMinAggregateInputType = {
    id?: true
    id_preventivo_al_cliente?: true
    senza_assicurazione?: true
    destinazione?: true
    descrizione?: true
    individuale?: true
    numero?: true
  }

  export type PreventivoAlClienteRowMaxAggregateInputType = {
    id?: true
    id_preventivo_al_cliente?: true
    senza_assicurazione?: true
    destinazione?: true
    descrizione?: true
    individuale?: true
    numero?: true
  }

  export type PreventivoAlClienteRowCountAggregateInputType = {
    id?: true
    id_preventivo_al_cliente?: true
    senza_assicurazione?: true
    destinazione?: true
    descrizione?: true
    individuale?: true
    numero?: true
    _all?: true
  }

  export type PreventivoAlClienteRowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreventivoAlClienteRow to aggregate.
     */
    where?: PreventivoAlClienteRowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivoAlClienteRows to fetch.
     */
    orderBy?: PreventivoAlClienteRowOrderByWithRelationInput | PreventivoAlClienteRowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreventivoAlClienteRowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivoAlClienteRows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivoAlClienteRows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreventivoAlClienteRows
    **/
    _count?: true | PreventivoAlClienteRowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreventivoAlClienteRowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreventivoAlClienteRowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreventivoAlClienteRowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreventivoAlClienteRowMaxAggregateInputType
  }

  export type GetPreventivoAlClienteRowAggregateType<T extends PreventivoAlClienteRowAggregateArgs> = {
        [P in keyof T & keyof AggregatePreventivoAlClienteRow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreventivoAlClienteRow[P]>
      : GetScalarType<T[P], AggregatePreventivoAlClienteRow[P]>
  }




  export type PreventivoAlClienteRowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreventivoAlClienteRowWhereInput
    orderBy?: PreventivoAlClienteRowOrderByWithAggregationInput | PreventivoAlClienteRowOrderByWithAggregationInput[]
    by: PreventivoAlClienteRowScalarFieldEnum[] | PreventivoAlClienteRowScalarFieldEnum
    having?: PreventivoAlClienteRowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreventivoAlClienteRowCountAggregateInputType | true
    _avg?: PreventivoAlClienteRowAvgAggregateInputType
    _sum?: PreventivoAlClienteRowSumAggregateInputType
    _min?: PreventivoAlClienteRowMinAggregateInputType
    _max?: PreventivoAlClienteRowMaxAggregateInputType
  }

  export type PreventivoAlClienteRowGroupByOutputType = {
    id: string
    id_preventivo_al_cliente: string
    senza_assicurazione: boolean | null
    destinazione: string | null
    descrizione: string | null
    individuale: number | null
    numero: number | null
    _count: PreventivoAlClienteRowCountAggregateOutputType | null
    _avg: PreventivoAlClienteRowAvgAggregateOutputType | null
    _sum: PreventivoAlClienteRowSumAggregateOutputType | null
    _min: PreventivoAlClienteRowMinAggregateOutputType | null
    _max: PreventivoAlClienteRowMaxAggregateOutputType | null
  }

  type GetPreventivoAlClienteRowGroupByPayload<T extends PreventivoAlClienteRowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreventivoAlClienteRowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreventivoAlClienteRowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreventivoAlClienteRowGroupByOutputType[P]>
            : GetScalarType<T[P], PreventivoAlClienteRowGroupByOutputType[P]>
        }
      >
    >


  export type PreventivoAlClienteRowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo_al_cliente?: boolean
    senza_assicurazione?: boolean
    destinazione?: boolean
    descrizione?: boolean
    individuale?: boolean
    numero?: boolean
    preventivoAlCliente?: boolean | PreventivoAlClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preventivoAlClienteRow"]>

  export type PreventivoAlClienteRowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo_al_cliente?: boolean
    senza_assicurazione?: boolean
    destinazione?: boolean
    descrizione?: boolean
    individuale?: boolean
    numero?: boolean
    preventivoAlCliente?: boolean | PreventivoAlClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preventivoAlClienteRow"]>

  export type PreventivoAlClienteRowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_preventivo_al_cliente?: boolean
    senza_assicurazione?: boolean
    destinazione?: boolean
    descrizione?: boolean
    individuale?: boolean
    numero?: boolean
    preventivoAlCliente?: boolean | PreventivoAlClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preventivoAlClienteRow"]>

  export type PreventivoAlClienteRowSelectScalar = {
    id?: boolean
    id_preventivo_al_cliente?: boolean
    senza_assicurazione?: boolean
    destinazione?: boolean
    descrizione?: boolean
    individuale?: boolean
    numero?: boolean
  }

  export type PreventivoAlClienteRowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_preventivo_al_cliente" | "senza_assicurazione" | "destinazione" | "descrizione" | "individuale" | "numero", ExtArgs["result"]["preventivoAlClienteRow"]>
  export type PreventivoAlClienteRowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivoAlCliente?: boolean | PreventivoAlClienteDefaultArgs<ExtArgs>
  }
  export type PreventivoAlClienteRowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivoAlCliente?: boolean | PreventivoAlClienteDefaultArgs<ExtArgs>
  }
  export type PreventivoAlClienteRowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preventivoAlCliente?: boolean | PreventivoAlClienteDefaultArgs<ExtArgs>
  }

  export type $PreventivoAlClienteRowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreventivoAlClienteRow"
    objects: {
      preventivoAlCliente: Prisma.$PreventivoAlClientePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      id_preventivo_al_cliente: string
      senza_assicurazione: boolean | null
      destinazione: string | null
      descrizione: string | null
      individuale: number | null
      numero: number | null
    }, ExtArgs["result"]["preventivoAlClienteRow"]>
    composites: {}
  }

  type PreventivoAlClienteRowGetPayload<S extends boolean | null | undefined | PreventivoAlClienteRowDefaultArgs> = $Result.GetResult<Prisma.$PreventivoAlClienteRowPayload, S>

  type PreventivoAlClienteRowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreventivoAlClienteRowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreventivoAlClienteRowCountAggregateInputType | true
    }

  export interface PreventivoAlClienteRowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PreventivoAlClienteRow'], meta: { name: 'PreventivoAlClienteRow' } }
    /**
     * Find zero or one PreventivoAlClienteRow that matches the filter.
     * @param {PreventivoAlClienteRowFindUniqueArgs} args - Arguments to find a PreventivoAlClienteRow
     * @example
     * // Get one PreventivoAlClienteRow
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreventivoAlClienteRowFindUniqueArgs>(args: SelectSubset<T, PreventivoAlClienteRowFindUniqueArgs<ExtArgs>>): Prisma__PreventivoAlClienteRowClient<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PreventivoAlClienteRow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreventivoAlClienteRowFindUniqueOrThrowArgs} args - Arguments to find a PreventivoAlClienteRow
     * @example
     * // Get one PreventivoAlClienteRow
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreventivoAlClienteRowFindUniqueOrThrowArgs>(args: SelectSubset<T, PreventivoAlClienteRowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreventivoAlClienteRowClient<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreventivoAlClienteRow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteRowFindFirstArgs} args - Arguments to find a PreventivoAlClienteRow
     * @example
     * // Get one PreventivoAlClienteRow
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreventivoAlClienteRowFindFirstArgs>(args?: SelectSubset<T, PreventivoAlClienteRowFindFirstArgs<ExtArgs>>): Prisma__PreventivoAlClienteRowClient<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreventivoAlClienteRow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteRowFindFirstOrThrowArgs} args - Arguments to find a PreventivoAlClienteRow
     * @example
     * // Get one PreventivoAlClienteRow
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreventivoAlClienteRowFindFirstOrThrowArgs>(args?: SelectSubset<T, PreventivoAlClienteRowFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreventivoAlClienteRowClient<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PreventivoAlClienteRows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteRowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreventivoAlClienteRows
     * const preventivoAlClienteRows = await prisma.preventivoAlClienteRow.findMany()
     * 
     * // Get first 10 PreventivoAlClienteRows
     * const preventivoAlClienteRows = await prisma.preventivoAlClienteRow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preventivoAlClienteRowWithIdOnly = await prisma.preventivoAlClienteRow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreventivoAlClienteRowFindManyArgs>(args?: SelectSubset<T, PreventivoAlClienteRowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PreventivoAlClienteRow.
     * @param {PreventivoAlClienteRowCreateArgs} args - Arguments to create a PreventivoAlClienteRow.
     * @example
     * // Create one PreventivoAlClienteRow
     * const PreventivoAlClienteRow = await prisma.preventivoAlClienteRow.create({
     *   data: {
     *     // ... data to create a PreventivoAlClienteRow
     *   }
     * })
     * 
     */
    create<T extends PreventivoAlClienteRowCreateArgs>(args: SelectSubset<T, PreventivoAlClienteRowCreateArgs<ExtArgs>>): Prisma__PreventivoAlClienteRowClient<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PreventivoAlClienteRows.
     * @param {PreventivoAlClienteRowCreateManyArgs} args - Arguments to create many PreventivoAlClienteRows.
     * @example
     * // Create many PreventivoAlClienteRows
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreventivoAlClienteRowCreateManyArgs>(args?: SelectSubset<T, PreventivoAlClienteRowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PreventivoAlClienteRows and returns the data saved in the database.
     * @param {PreventivoAlClienteRowCreateManyAndReturnArgs} args - Arguments to create many PreventivoAlClienteRows.
     * @example
     * // Create many PreventivoAlClienteRows
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PreventivoAlClienteRows and only return the `id`
     * const preventivoAlClienteRowWithIdOnly = await prisma.preventivoAlClienteRow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreventivoAlClienteRowCreateManyAndReturnArgs>(args?: SelectSubset<T, PreventivoAlClienteRowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PreventivoAlClienteRow.
     * @param {PreventivoAlClienteRowDeleteArgs} args - Arguments to delete one PreventivoAlClienteRow.
     * @example
     * // Delete one PreventivoAlClienteRow
     * const PreventivoAlClienteRow = await prisma.preventivoAlClienteRow.delete({
     *   where: {
     *     // ... filter to delete one PreventivoAlClienteRow
     *   }
     * })
     * 
     */
    delete<T extends PreventivoAlClienteRowDeleteArgs>(args: SelectSubset<T, PreventivoAlClienteRowDeleteArgs<ExtArgs>>): Prisma__PreventivoAlClienteRowClient<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PreventivoAlClienteRow.
     * @param {PreventivoAlClienteRowUpdateArgs} args - Arguments to update one PreventivoAlClienteRow.
     * @example
     * // Update one PreventivoAlClienteRow
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreventivoAlClienteRowUpdateArgs>(args: SelectSubset<T, PreventivoAlClienteRowUpdateArgs<ExtArgs>>): Prisma__PreventivoAlClienteRowClient<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PreventivoAlClienteRows.
     * @param {PreventivoAlClienteRowDeleteManyArgs} args - Arguments to filter PreventivoAlClienteRows to delete.
     * @example
     * // Delete a few PreventivoAlClienteRows
     * const { count } = await prisma.preventivoAlClienteRow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreventivoAlClienteRowDeleteManyArgs>(args?: SelectSubset<T, PreventivoAlClienteRowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreventivoAlClienteRows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteRowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreventivoAlClienteRows
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreventivoAlClienteRowUpdateManyArgs>(args: SelectSubset<T, PreventivoAlClienteRowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreventivoAlClienteRows and returns the data updated in the database.
     * @param {PreventivoAlClienteRowUpdateManyAndReturnArgs} args - Arguments to update many PreventivoAlClienteRows.
     * @example
     * // Update many PreventivoAlClienteRows
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PreventivoAlClienteRows and only return the `id`
     * const preventivoAlClienteRowWithIdOnly = await prisma.preventivoAlClienteRow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PreventivoAlClienteRowUpdateManyAndReturnArgs>(args: SelectSubset<T, PreventivoAlClienteRowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PreventivoAlClienteRow.
     * @param {PreventivoAlClienteRowUpsertArgs} args - Arguments to update or create a PreventivoAlClienteRow.
     * @example
     * // Update or create a PreventivoAlClienteRow
     * const preventivoAlClienteRow = await prisma.preventivoAlClienteRow.upsert({
     *   create: {
     *     // ... data to create a PreventivoAlClienteRow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreventivoAlClienteRow we want to update
     *   }
     * })
     */
    upsert<T extends PreventivoAlClienteRowUpsertArgs>(args: SelectSubset<T, PreventivoAlClienteRowUpsertArgs<ExtArgs>>): Prisma__PreventivoAlClienteRowClient<$Result.GetResult<Prisma.$PreventivoAlClienteRowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PreventivoAlClienteRows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteRowCountArgs} args - Arguments to filter PreventivoAlClienteRows to count.
     * @example
     * // Count the number of PreventivoAlClienteRows
     * const count = await prisma.preventivoAlClienteRow.count({
     *   where: {
     *     // ... the filter for the PreventivoAlClienteRows we want to count
     *   }
     * })
    **/
    count<T extends PreventivoAlClienteRowCountArgs>(
      args?: Subset<T, PreventivoAlClienteRowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreventivoAlClienteRowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreventivoAlClienteRow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteRowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreventivoAlClienteRowAggregateArgs>(args: Subset<T, PreventivoAlClienteRowAggregateArgs>): Prisma.PrismaPromise<GetPreventivoAlClienteRowAggregateType<T>>

    /**
     * Group by PreventivoAlClienteRow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreventivoAlClienteRowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreventivoAlClienteRowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreventivoAlClienteRowGroupByArgs['orderBy'] }
        : { orderBy?: PreventivoAlClienteRowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreventivoAlClienteRowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreventivoAlClienteRowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PreventivoAlClienteRow model
   */
  readonly fields: PreventivoAlClienteRowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PreventivoAlClienteRow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreventivoAlClienteRowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preventivoAlCliente<T extends PreventivoAlClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PreventivoAlClienteDefaultArgs<ExtArgs>>): Prisma__PreventivoAlClienteClient<$Result.GetResult<Prisma.$PreventivoAlClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PreventivoAlClienteRow model
   */
  interface PreventivoAlClienteRowFieldRefs {
    readonly id: FieldRef<"PreventivoAlClienteRow", 'String'>
    readonly id_preventivo_al_cliente: FieldRef<"PreventivoAlClienteRow", 'String'>
    readonly senza_assicurazione: FieldRef<"PreventivoAlClienteRow", 'Boolean'>
    readonly destinazione: FieldRef<"PreventivoAlClienteRow", 'String'>
    readonly descrizione: FieldRef<"PreventivoAlClienteRow", 'String'>
    readonly individuale: FieldRef<"PreventivoAlClienteRow", 'Float'>
    readonly numero: FieldRef<"PreventivoAlClienteRow", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PreventivoAlClienteRow findUnique
   */
  export type PreventivoAlClienteRowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlClienteRow to fetch.
     */
    where: PreventivoAlClienteRowWhereUniqueInput
  }

  /**
   * PreventivoAlClienteRow findUniqueOrThrow
   */
  export type PreventivoAlClienteRowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlClienteRow to fetch.
     */
    where: PreventivoAlClienteRowWhereUniqueInput
  }

  /**
   * PreventivoAlClienteRow findFirst
   */
  export type PreventivoAlClienteRowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlClienteRow to fetch.
     */
    where?: PreventivoAlClienteRowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivoAlClienteRows to fetch.
     */
    orderBy?: PreventivoAlClienteRowOrderByWithRelationInput | PreventivoAlClienteRowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventivoAlClienteRows.
     */
    cursor?: PreventivoAlClienteRowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivoAlClienteRows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivoAlClienteRows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventivoAlClienteRows.
     */
    distinct?: PreventivoAlClienteRowScalarFieldEnum | PreventivoAlClienteRowScalarFieldEnum[]
  }

  /**
   * PreventivoAlClienteRow findFirstOrThrow
   */
  export type PreventivoAlClienteRowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlClienteRow to fetch.
     */
    where?: PreventivoAlClienteRowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivoAlClienteRows to fetch.
     */
    orderBy?: PreventivoAlClienteRowOrderByWithRelationInput | PreventivoAlClienteRowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreventivoAlClienteRows.
     */
    cursor?: PreventivoAlClienteRowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivoAlClienteRows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivoAlClienteRows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreventivoAlClienteRows.
     */
    distinct?: PreventivoAlClienteRowScalarFieldEnum | PreventivoAlClienteRowScalarFieldEnum[]
  }

  /**
   * PreventivoAlClienteRow findMany
   */
  export type PreventivoAlClienteRowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * Filter, which PreventivoAlClienteRows to fetch.
     */
    where?: PreventivoAlClienteRowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreventivoAlClienteRows to fetch.
     */
    orderBy?: PreventivoAlClienteRowOrderByWithRelationInput | PreventivoAlClienteRowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreventivoAlClienteRows.
     */
    cursor?: PreventivoAlClienteRowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreventivoAlClienteRows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreventivoAlClienteRows.
     */
    skip?: number
    distinct?: PreventivoAlClienteRowScalarFieldEnum | PreventivoAlClienteRowScalarFieldEnum[]
  }

  /**
   * PreventivoAlClienteRow create
   */
  export type PreventivoAlClienteRowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * The data needed to create a PreventivoAlClienteRow.
     */
    data: XOR<PreventivoAlClienteRowCreateInput, PreventivoAlClienteRowUncheckedCreateInput>
  }

  /**
   * PreventivoAlClienteRow createMany
   */
  export type PreventivoAlClienteRowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PreventivoAlClienteRows.
     */
    data: PreventivoAlClienteRowCreateManyInput | PreventivoAlClienteRowCreateManyInput[]
  }

  /**
   * PreventivoAlClienteRow createManyAndReturn
   */
  export type PreventivoAlClienteRowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * The data used to create many PreventivoAlClienteRows.
     */
    data: PreventivoAlClienteRowCreateManyInput | PreventivoAlClienteRowCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PreventivoAlClienteRow update
   */
  export type PreventivoAlClienteRowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * The data needed to update a PreventivoAlClienteRow.
     */
    data: XOR<PreventivoAlClienteRowUpdateInput, PreventivoAlClienteRowUncheckedUpdateInput>
    /**
     * Choose, which PreventivoAlClienteRow to update.
     */
    where: PreventivoAlClienteRowWhereUniqueInput
  }

  /**
   * PreventivoAlClienteRow updateMany
   */
  export type PreventivoAlClienteRowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PreventivoAlClienteRows.
     */
    data: XOR<PreventivoAlClienteRowUpdateManyMutationInput, PreventivoAlClienteRowUncheckedUpdateManyInput>
    /**
     * Filter which PreventivoAlClienteRows to update
     */
    where?: PreventivoAlClienteRowWhereInput
    /**
     * Limit how many PreventivoAlClienteRows to update.
     */
    limit?: number
  }

  /**
   * PreventivoAlClienteRow updateManyAndReturn
   */
  export type PreventivoAlClienteRowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * The data used to update PreventivoAlClienteRows.
     */
    data: XOR<PreventivoAlClienteRowUpdateManyMutationInput, PreventivoAlClienteRowUncheckedUpdateManyInput>
    /**
     * Filter which PreventivoAlClienteRows to update
     */
    where?: PreventivoAlClienteRowWhereInput
    /**
     * Limit how many PreventivoAlClienteRows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PreventivoAlClienteRow upsert
   */
  export type PreventivoAlClienteRowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * The filter to search for the PreventivoAlClienteRow to update in case it exists.
     */
    where: PreventivoAlClienteRowWhereUniqueInput
    /**
     * In case the PreventivoAlClienteRow found by the `where` argument doesn't exist, create a new PreventivoAlClienteRow with this data.
     */
    create: XOR<PreventivoAlClienteRowCreateInput, PreventivoAlClienteRowUncheckedCreateInput>
    /**
     * In case the PreventivoAlClienteRow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreventivoAlClienteRowUpdateInput, PreventivoAlClienteRowUncheckedUpdateInput>
  }

  /**
   * PreventivoAlClienteRow delete
   */
  export type PreventivoAlClienteRowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
    /**
     * Filter which PreventivoAlClienteRow to delete.
     */
    where: PreventivoAlClienteRowWhereUniqueInput
  }

  /**
   * PreventivoAlClienteRow deleteMany
   */
  export type PreventivoAlClienteRowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreventivoAlClienteRows to delete
     */
    where?: PreventivoAlClienteRowWhereInput
    /**
     * Limit how many PreventivoAlClienteRows to delete.
     */
    limit?: number
  }

  /**
   * PreventivoAlClienteRow without action
   */
  export type PreventivoAlClienteRowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreventivoAlClienteRow
     */
    select?: PreventivoAlClienteRowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreventivoAlClienteRow
     */
    omit?: PreventivoAlClienteRowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreventivoAlClienteRowInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DestinazioneScalarFieldEnum: {
    id: 'id',
    nome: 'nome'
  };

  export type DestinazioneScalarFieldEnum = (typeof DestinazioneScalarFieldEnum)[keyof typeof DestinazioneScalarFieldEnum]


  export const BancaScalarFieldEnum: {
    id: 'id',
    nome: 'nome'
  };

  export type BancaScalarFieldEnum = (typeof BancaScalarFieldEnum)[keyof typeof BancaScalarFieldEnum]


  export const ClienteScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cognome: 'cognome',
    tel: 'tel',
    indirizzo: 'indirizzo',
    CAP: 'CAP',
    citta: 'citta',
    CF: 'CF',
    email: 'email',
    tipo: 'tipo',
    provenienza: 'provenienza',
    collegato: 'collegato',
    note: 'note',
    data_di_nascita: 'data_di_nascita',
    luogo_nascita: 'luogo_nascita',
    provincia_nascita: 'provincia_nascita',
    numero_passaporto: 'numero_passaporto',
    data_scadenza_passaporto: 'data_scadenza_passaporto',
    nazionalita: 'nazionalita',
    provincia: 'provincia',
    sesso: 'sesso'
  };

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const FornitoreScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    valuta: 'valuta'
  };

  export type FornitoreScalarFieldEnum = (typeof FornitoreScalarFieldEnum)[keyof typeof FornitoreScalarFieldEnum]


  export const PreventivoScalarFieldEnum: {
    id: 'id',
    id_cliente: 'id_cliente',
    percentuale_ricarico: 'percentuale_ricarico',
    note: 'note',
    brand: 'brand',
    adulti: 'adulti',
    bambini: 'bambini',
    destinazione: 'destinazione',
    tipo_viaggio: 'tipo_viaggio',
    note_operative: 'note_operative',
    riferimento: 'riferimento',
    data_partenza: 'data_partenza',
    operatore: 'operatore',
    feedback: 'feedback',
    stato: 'stato',
    data: 'data',
    numero_preventivo: 'numero_preventivo'
  };

  export type PreventivoScalarFieldEnum = (typeof PreventivoScalarFieldEnum)[keyof typeof PreventivoScalarFieldEnum]


  export const ServiziATerraScalarFieldEnum: {
    id: 'id',
    id_preventivo: 'id_preventivo',
    id_fornitore: 'id_fornitore',
    id_destinazione: 'id_destinazione',
    descrizione: 'descrizione',
    data: 'data',
    numero_notti: 'numero_notti',
    numero_camere: 'numero_camere',
    totale: 'totale',
    valuta: 'valuta',
    cambio: 'cambio',
    servizio_aggiuntivo: 'servizio_aggiuntivo'
  };

  export type ServiziATerraScalarFieldEnum = (typeof ServiziATerraScalarFieldEnum)[keyof typeof ServiziATerraScalarFieldEnum]


  export const VoloScalarFieldEnum: {
    id: 'id',
    id_preventivo: 'id_preventivo',
    id_fornitore: 'id_fornitore',
    compagnia_aerea: 'compagnia_aerea',
    descrizione: 'descrizione',
    data_partenza: 'data_partenza',
    data_arrivo: 'data_arrivo',
    totale: 'totale',
    ricarico: 'ricarico',
    numero: 'numero',
    valuta: 'valuta',
    cambio: 'cambio'
  };

  export type VoloScalarFieldEnum = (typeof VoloScalarFieldEnum)[keyof typeof VoloScalarFieldEnum]


  export const AssicurazioneScalarFieldEnum: {
    id: 'id',
    id_preventivo: 'id_preventivo',
    id_fornitore: 'id_fornitore',
    assicurazione: 'assicurazione',
    netto: 'netto',
    ricarico: 'ricarico',
    numero: 'numero'
  };

  export type AssicurazioneScalarFieldEnum = (typeof AssicurazioneScalarFieldEnum)[keyof typeof AssicurazioneScalarFieldEnum]


  export const PreventivoAlClienteScalarFieldEnum: {
    id: 'id',
    id_preventivo: 'id_preventivo',
    descrizione_viaggio: 'descrizione_viaggio'
  };

  export type PreventivoAlClienteScalarFieldEnum = (typeof PreventivoAlClienteScalarFieldEnum)[keyof typeof PreventivoAlClienteScalarFieldEnum]


  export const PreventivoAlClienteRowScalarFieldEnum: {
    id: 'id',
    id_preventivo_al_cliente: 'id_preventivo_al_cliente',
    senza_assicurazione: 'senza_assicurazione',
    destinazione: 'destinazione',
    descrizione: 'descrizione',
    individuale: 'individuale',
    numero: 'numero'
  };

  export type PreventivoAlClienteRowScalarFieldEnum = (typeof PreventivoAlClienteRowScalarFieldEnum)[keyof typeof PreventivoAlClienteRowScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
  }

  export type DestinazioneWhereInput = {
    AND?: DestinazioneWhereInput | DestinazioneWhereInput[]
    OR?: DestinazioneWhereInput[]
    NOT?: DestinazioneWhereInput | DestinazioneWhereInput[]
    id?: StringFilter<"Destinazione"> | string
    nome?: StringFilter<"Destinazione"> | string
    serviziATerra?: ServiziATerraListRelationFilter
  }

  export type DestinazioneOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    serviziATerra?: ServiziATerraOrderByRelationAggregateInput
  }

  export type DestinazioneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nome?: string
    AND?: DestinazioneWhereInput | DestinazioneWhereInput[]
    OR?: DestinazioneWhereInput[]
    NOT?: DestinazioneWhereInput | DestinazioneWhereInput[]
    serviziATerra?: ServiziATerraListRelationFilter
  }, "id" | "nome">

  export type DestinazioneOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    _count?: DestinazioneCountOrderByAggregateInput
    _max?: DestinazioneMaxOrderByAggregateInput
    _min?: DestinazioneMinOrderByAggregateInput
  }

  export type DestinazioneScalarWhereWithAggregatesInput = {
    AND?: DestinazioneScalarWhereWithAggregatesInput | DestinazioneScalarWhereWithAggregatesInput[]
    OR?: DestinazioneScalarWhereWithAggregatesInput[]
    NOT?: DestinazioneScalarWhereWithAggregatesInput | DestinazioneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Destinazione"> | string
    nome?: StringWithAggregatesFilter<"Destinazione"> | string
  }

  export type BancaWhereInput = {
    AND?: BancaWhereInput | BancaWhereInput[]
    OR?: BancaWhereInput[]
    NOT?: BancaWhereInput | BancaWhereInput[]
    id?: StringFilter<"Banca"> | string
    nome?: StringFilter<"Banca"> | string
  }

  export type BancaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type BancaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nome?: string
    AND?: BancaWhereInput | BancaWhereInput[]
    OR?: BancaWhereInput[]
    NOT?: BancaWhereInput | BancaWhereInput[]
  }, "id" | "nome">

  export type BancaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    _count?: BancaCountOrderByAggregateInput
    _max?: BancaMaxOrderByAggregateInput
    _min?: BancaMinOrderByAggregateInput
  }

  export type BancaScalarWhereWithAggregatesInput = {
    AND?: BancaScalarWhereWithAggregatesInput | BancaScalarWhereWithAggregatesInput[]
    OR?: BancaScalarWhereWithAggregatesInput[]
    NOT?: BancaScalarWhereWithAggregatesInput | BancaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Banca"> | string
    nome?: StringWithAggregatesFilter<"Banca"> | string
  }

  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: StringFilter<"Cliente"> | string
    nome?: StringNullableFilter<"Cliente"> | string | null
    cognome?: StringNullableFilter<"Cliente"> | string | null
    tel?: StringNullableFilter<"Cliente"> | string | null
    indirizzo?: StringNullableFilter<"Cliente"> | string | null
    CAP?: StringNullableFilter<"Cliente"> | string | null
    citta?: StringNullableFilter<"Cliente"> | string | null
    CF?: StringNullableFilter<"Cliente"> | string | null
    email?: StringFilter<"Cliente"> | string
    tipo?: StringNullableFilter<"Cliente"> | string | null
    provenienza?: StringNullableFilter<"Cliente"> | string | null
    collegato?: StringNullableFilter<"Cliente"> | string | null
    note?: StringNullableFilter<"Cliente"> | string | null
    data_di_nascita?: DateTimeNullableFilter<"Cliente"> | Date | string | null
    luogo_nascita?: StringNullableFilter<"Cliente"> | string | null
    provincia_nascita?: StringNullableFilter<"Cliente"> | string | null
    numero_passaporto?: StringNullableFilter<"Cliente"> | string | null
    data_scadenza_passaporto?: DateTimeNullableFilter<"Cliente"> | Date | string | null
    nazionalita?: StringNullableFilter<"Cliente"> | string | null
    provincia?: StringNullableFilter<"Cliente"> | string | null
    sesso?: StringNullableFilter<"Cliente"> | string | null
    preventivi?: PreventivoListRelationFilter
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    cognome?: SortOrderInput | SortOrder
    tel?: SortOrderInput | SortOrder
    indirizzo?: SortOrderInput | SortOrder
    CAP?: SortOrderInput | SortOrder
    citta?: SortOrderInput | SortOrder
    CF?: SortOrderInput | SortOrder
    email?: SortOrder
    tipo?: SortOrderInput | SortOrder
    provenienza?: SortOrderInput | SortOrder
    collegato?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    data_di_nascita?: SortOrderInput | SortOrder
    luogo_nascita?: SortOrderInput | SortOrder
    provincia_nascita?: SortOrderInput | SortOrder
    numero_passaporto?: SortOrderInput | SortOrder
    data_scadenza_passaporto?: SortOrderInput | SortOrder
    nazionalita?: SortOrderInput | SortOrder
    provincia?: SortOrderInput | SortOrder
    sesso?: SortOrderInput | SortOrder
    preventivi?: PreventivoOrderByRelationAggregateInput
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    nome?: StringNullableFilter<"Cliente"> | string | null
    cognome?: StringNullableFilter<"Cliente"> | string | null
    tel?: StringNullableFilter<"Cliente"> | string | null
    indirizzo?: StringNullableFilter<"Cliente"> | string | null
    CAP?: StringNullableFilter<"Cliente"> | string | null
    citta?: StringNullableFilter<"Cliente"> | string | null
    CF?: StringNullableFilter<"Cliente"> | string | null
    tipo?: StringNullableFilter<"Cliente"> | string | null
    provenienza?: StringNullableFilter<"Cliente"> | string | null
    collegato?: StringNullableFilter<"Cliente"> | string | null
    note?: StringNullableFilter<"Cliente"> | string | null
    data_di_nascita?: DateTimeNullableFilter<"Cliente"> | Date | string | null
    luogo_nascita?: StringNullableFilter<"Cliente"> | string | null
    provincia_nascita?: StringNullableFilter<"Cliente"> | string | null
    numero_passaporto?: StringNullableFilter<"Cliente"> | string | null
    data_scadenza_passaporto?: DateTimeNullableFilter<"Cliente"> | Date | string | null
    nazionalita?: StringNullableFilter<"Cliente"> | string | null
    provincia?: StringNullableFilter<"Cliente"> | string | null
    sesso?: StringNullableFilter<"Cliente"> | string | null
    preventivi?: PreventivoListRelationFilter
  }, "id" | "email">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    cognome?: SortOrderInput | SortOrder
    tel?: SortOrderInput | SortOrder
    indirizzo?: SortOrderInput | SortOrder
    CAP?: SortOrderInput | SortOrder
    citta?: SortOrderInput | SortOrder
    CF?: SortOrderInput | SortOrder
    email?: SortOrder
    tipo?: SortOrderInput | SortOrder
    provenienza?: SortOrderInput | SortOrder
    collegato?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    data_di_nascita?: SortOrderInput | SortOrder
    luogo_nascita?: SortOrderInput | SortOrder
    provincia_nascita?: SortOrderInput | SortOrder
    numero_passaporto?: SortOrderInput | SortOrder
    data_scadenza_passaporto?: SortOrderInput | SortOrder
    nazionalita?: SortOrderInput | SortOrder
    provincia?: SortOrderInput | SortOrder
    sesso?: SortOrderInput | SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cliente"> | string
    nome?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    cognome?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    tel?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    indirizzo?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    CAP?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    citta?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    CF?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    email?: StringWithAggregatesFilter<"Cliente"> | string
    tipo?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    provenienza?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    collegato?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    note?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    data_di_nascita?: DateTimeNullableWithAggregatesFilter<"Cliente"> | Date | string | null
    luogo_nascita?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    provincia_nascita?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    numero_passaporto?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    data_scadenza_passaporto?: DateTimeNullableWithAggregatesFilter<"Cliente"> | Date | string | null
    nazionalita?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    provincia?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    sesso?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
  }

  export type FornitoreWhereInput = {
    AND?: FornitoreWhereInput | FornitoreWhereInput[]
    OR?: FornitoreWhereInput[]
    NOT?: FornitoreWhereInput | FornitoreWhereInput[]
    id?: StringFilter<"Fornitore"> | string
    nome?: StringFilter<"Fornitore"> | string
    valuta?: StringNullableFilter<"Fornitore"> | string | null
    serviziATerra?: ServiziATerraListRelationFilter
    voli?: VoloListRelationFilter
    assicurazioni?: AssicurazioneListRelationFilter
  }

  export type FornitoreOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    valuta?: SortOrderInput | SortOrder
    serviziATerra?: ServiziATerraOrderByRelationAggregateInput
    voli?: VoloOrderByRelationAggregateInput
    assicurazioni?: AssicurazioneOrderByRelationAggregateInput
  }

  export type FornitoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nome?: string
    AND?: FornitoreWhereInput | FornitoreWhereInput[]
    OR?: FornitoreWhereInput[]
    NOT?: FornitoreWhereInput | FornitoreWhereInput[]
    valuta?: StringNullableFilter<"Fornitore"> | string | null
    serviziATerra?: ServiziATerraListRelationFilter
    voli?: VoloListRelationFilter
    assicurazioni?: AssicurazioneListRelationFilter
  }, "id" | "nome">

  export type FornitoreOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    valuta?: SortOrderInput | SortOrder
    _count?: FornitoreCountOrderByAggregateInput
    _max?: FornitoreMaxOrderByAggregateInput
    _min?: FornitoreMinOrderByAggregateInput
  }

  export type FornitoreScalarWhereWithAggregatesInput = {
    AND?: FornitoreScalarWhereWithAggregatesInput | FornitoreScalarWhereWithAggregatesInput[]
    OR?: FornitoreScalarWhereWithAggregatesInput[]
    NOT?: FornitoreScalarWhereWithAggregatesInput | FornitoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Fornitore"> | string
    nome?: StringWithAggregatesFilter<"Fornitore"> | string
    valuta?: StringNullableWithAggregatesFilter<"Fornitore"> | string | null
  }

  export type PreventivoWhereInput = {
    AND?: PreventivoWhereInput | PreventivoWhereInput[]
    OR?: PreventivoWhereInput[]
    NOT?: PreventivoWhereInput | PreventivoWhereInput[]
    id?: StringFilter<"Preventivo"> | string
    id_cliente?: StringFilter<"Preventivo"> | string
    percentuale_ricarico?: FloatNullableFilter<"Preventivo"> | number | null
    note?: StringNullableFilter<"Preventivo"> | string | null
    brand?: StringNullableFilter<"Preventivo"> | string | null
    adulti?: IntNullableFilter<"Preventivo"> | number | null
    bambini?: IntNullableFilter<"Preventivo"> | number | null
    destinazione?: StringNullableFilter<"Preventivo"> | string | null
    tipo_viaggio?: StringNullableFilter<"Preventivo"> | string | null
    note_operative?: StringNullableFilter<"Preventivo"> | string | null
    riferimento?: StringNullableFilter<"Preventivo"> | string | null
    data_partenza?: DateTimeNullableFilter<"Preventivo"> | Date | string | null
    operatore?: StringNullableFilter<"Preventivo"> | string | null
    feedback?: StringNullableFilter<"Preventivo"> | string | null
    stato?: StringNullableFilter<"Preventivo"> | string | null
    data?: DateTimeFilter<"Preventivo"> | Date | string
    numero_preventivo?: StringNullableFilter<"Preventivo"> | string | null
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    serviziATerra?: ServiziATerraListRelationFilter
    voli?: VoloListRelationFilter
    assicurazioni?: AssicurazioneListRelationFilter
    preventiviAlCliente?: PreventivoAlClienteListRelationFilter
  }

  export type PreventivoOrderByWithRelationInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    percentuale_ricarico?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    adulti?: SortOrderInput | SortOrder
    bambini?: SortOrderInput | SortOrder
    destinazione?: SortOrderInput | SortOrder
    tipo_viaggio?: SortOrderInput | SortOrder
    note_operative?: SortOrderInput | SortOrder
    riferimento?: SortOrderInput | SortOrder
    data_partenza?: SortOrderInput | SortOrder
    operatore?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    stato?: SortOrderInput | SortOrder
    data?: SortOrder
    numero_preventivo?: SortOrderInput | SortOrder
    cliente?: ClienteOrderByWithRelationInput
    serviziATerra?: ServiziATerraOrderByRelationAggregateInput
    voli?: VoloOrderByRelationAggregateInput
    assicurazioni?: AssicurazioneOrderByRelationAggregateInput
    preventiviAlCliente?: PreventivoAlClienteOrderByRelationAggregateInput
  }

  export type PreventivoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero_preventivo?: string
    AND?: PreventivoWhereInput | PreventivoWhereInput[]
    OR?: PreventivoWhereInput[]
    NOT?: PreventivoWhereInput | PreventivoWhereInput[]
    id_cliente?: StringFilter<"Preventivo"> | string
    percentuale_ricarico?: FloatNullableFilter<"Preventivo"> | number | null
    note?: StringNullableFilter<"Preventivo"> | string | null
    brand?: StringNullableFilter<"Preventivo"> | string | null
    adulti?: IntNullableFilter<"Preventivo"> | number | null
    bambini?: IntNullableFilter<"Preventivo"> | number | null
    destinazione?: StringNullableFilter<"Preventivo"> | string | null
    tipo_viaggio?: StringNullableFilter<"Preventivo"> | string | null
    note_operative?: StringNullableFilter<"Preventivo"> | string | null
    riferimento?: StringNullableFilter<"Preventivo"> | string | null
    data_partenza?: DateTimeNullableFilter<"Preventivo"> | Date | string | null
    operatore?: StringNullableFilter<"Preventivo"> | string | null
    feedback?: StringNullableFilter<"Preventivo"> | string | null
    stato?: StringNullableFilter<"Preventivo"> | string | null
    data?: DateTimeFilter<"Preventivo"> | Date | string
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    serviziATerra?: ServiziATerraListRelationFilter
    voli?: VoloListRelationFilter
    assicurazioni?: AssicurazioneListRelationFilter
    preventiviAlCliente?: PreventivoAlClienteListRelationFilter
  }, "id" | "numero_preventivo">

  export type PreventivoOrderByWithAggregationInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    percentuale_ricarico?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    adulti?: SortOrderInput | SortOrder
    bambini?: SortOrderInput | SortOrder
    destinazione?: SortOrderInput | SortOrder
    tipo_viaggio?: SortOrderInput | SortOrder
    note_operative?: SortOrderInput | SortOrder
    riferimento?: SortOrderInput | SortOrder
    data_partenza?: SortOrderInput | SortOrder
    operatore?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    stato?: SortOrderInput | SortOrder
    data?: SortOrder
    numero_preventivo?: SortOrderInput | SortOrder
    _count?: PreventivoCountOrderByAggregateInput
    _avg?: PreventivoAvgOrderByAggregateInput
    _max?: PreventivoMaxOrderByAggregateInput
    _min?: PreventivoMinOrderByAggregateInput
    _sum?: PreventivoSumOrderByAggregateInput
  }

  export type PreventivoScalarWhereWithAggregatesInput = {
    AND?: PreventivoScalarWhereWithAggregatesInput | PreventivoScalarWhereWithAggregatesInput[]
    OR?: PreventivoScalarWhereWithAggregatesInput[]
    NOT?: PreventivoScalarWhereWithAggregatesInput | PreventivoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Preventivo"> | string
    id_cliente?: StringWithAggregatesFilter<"Preventivo"> | string
    percentuale_ricarico?: FloatNullableWithAggregatesFilter<"Preventivo"> | number | null
    note?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    brand?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    adulti?: IntNullableWithAggregatesFilter<"Preventivo"> | number | null
    bambini?: IntNullableWithAggregatesFilter<"Preventivo"> | number | null
    destinazione?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    tipo_viaggio?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    note_operative?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    riferimento?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    data_partenza?: DateTimeNullableWithAggregatesFilter<"Preventivo"> | Date | string | null
    operatore?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    feedback?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    stato?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
    data?: DateTimeWithAggregatesFilter<"Preventivo"> | Date | string
    numero_preventivo?: StringNullableWithAggregatesFilter<"Preventivo"> | string | null
  }

  export type ServiziATerraWhereInput = {
    AND?: ServiziATerraWhereInput | ServiziATerraWhereInput[]
    OR?: ServiziATerraWhereInput[]
    NOT?: ServiziATerraWhereInput | ServiziATerraWhereInput[]
    id?: StringFilter<"ServiziATerra"> | string
    id_preventivo?: StringFilter<"ServiziATerra"> | string
    id_fornitore?: StringNullableFilter<"ServiziATerra"> | string | null
    id_destinazione?: StringNullableFilter<"ServiziATerra"> | string | null
    descrizione?: StringNullableFilter<"ServiziATerra"> | string | null
    data?: DateTimeNullableFilter<"ServiziATerra"> | Date | string | null
    numero_notti?: IntNullableFilter<"ServiziATerra"> | number | null
    numero_camere?: IntNullableFilter<"ServiziATerra"> | number | null
    totale?: FloatNullableFilter<"ServiziATerra"> | number | null
    valuta?: StringNullableFilter<"ServiziATerra"> | string | null
    cambio?: FloatNullableFilter<"ServiziATerra"> | number | null
    servizio_aggiuntivo?: BoolNullableFilter<"ServiziATerra"> | boolean | null
    preventivo?: XOR<PreventivoScalarRelationFilter, PreventivoWhereInput>
    fornitore?: XOR<FornitoreNullableScalarRelationFilter, FornitoreWhereInput> | null
    destinazione?: XOR<DestinazioneNullableScalarRelationFilter, DestinazioneWhereInput> | null
  }

  export type ServiziATerraOrderByWithRelationInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrderInput | SortOrder
    id_destinazione?: SortOrderInput | SortOrder
    descrizione?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    numero_notti?: SortOrderInput | SortOrder
    numero_camere?: SortOrderInput | SortOrder
    totale?: SortOrderInput | SortOrder
    valuta?: SortOrderInput | SortOrder
    cambio?: SortOrderInput | SortOrder
    servizio_aggiuntivo?: SortOrderInput | SortOrder
    preventivo?: PreventivoOrderByWithRelationInput
    fornitore?: FornitoreOrderByWithRelationInput
    destinazione?: DestinazioneOrderByWithRelationInput
  }

  export type ServiziATerraWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiziATerraWhereInput | ServiziATerraWhereInput[]
    OR?: ServiziATerraWhereInput[]
    NOT?: ServiziATerraWhereInput | ServiziATerraWhereInput[]
    id_preventivo?: StringFilter<"ServiziATerra"> | string
    id_fornitore?: StringNullableFilter<"ServiziATerra"> | string | null
    id_destinazione?: StringNullableFilter<"ServiziATerra"> | string | null
    descrizione?: StringNullableFilter<"ServiziATerra"> | string | null
    data?: DateTimeNullableFilter<"ServiziATerra"> | Date | string | null
    numero_notti?: IntNullableFilter<"ServiziATerra"> | number | null
    numero_camere?: IntNullableFilter<"ServiziATerra"> | number | null
    totale?: FloatNullableFilter<"ServiziATerra"> | number | null
    valuta?: StringNullableFilter<"ServiziATerra"> | string | null
    cambio?: FloatNullableFilter<"ServiziATerra"> | number | null
    servizio_aggiuntivo?: BoolNullableFilter<"ServiziATerra"> | boolean | null
    preventivo?: XOR<PreventivoScalarRelationFilter, PreventivoWhereInput>
    fornitore?: XOR<FornitoreNullableScalarRelationFilter, FornitoreWhereInput> | null
    destinazione?: XOR<DestinazioneNullableScalarRelationFilter, DestinazioneWhereInput> | null
  }, "id">

  export type ServiziATerraOrderByWithAggregationInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrderInput | SortOrder
    id_destinazione?: SortOrderInput | SortOrder
    descrizione?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    numero_notti?: SortOrderInput | SortOrder
    numero_camere?: SortOrderInput | SortOrder
    totale?: SortOrderInput | SortOrder
    valuta?: SortOrderInput | SortOrder
    cambio?: SortOrderInput | SortOrder
    servizio_aggiuntivo?: SortOrderInput | SortOrder
    _count?: ServiziATerraCountOrderByAggregateInput
    _avg?: ServiziATerraAvgOrderByAggregateInput
    _max?: ServiziATerraMaxOrderByAggregateInput
    _min?: ServiziATerraMinOrderByAggregateInput
    _sum?: ServiziATerraSumOrderByAggregateInput
  }

  export type ServiziATerraScalarWhereWithAggregatesInput = {
    AND?: ServiziATerraScalarWhereWithAggregatesInput | ServiziATerraScalarWhereWithAggregatesInput[]
    OR?: ServiziATerraScalarWhereWithAggregatesInput[]
    NOT?: ServiziATerraScalarWhereWithAggregatesInput | ServiziATerraScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiziATerra"> | string
    id_preventivo?: StringWithAggregatesFilter<"ServiziATerra"> | string
    id_fornitore?: StringNullableWithAggregatesFilter<"ServiziATerra"> | string | null
    id_destinazione?: StringNullableWithAggregatesFilter<"ServiziATerra"> | string | null
    descrizione?: StringNullableWithAggregatesFilter<"ServiziATerra"> | string | null
    data?: DateTimeNullableWithAggregatesFilter<"ServiziATerra"> | Date | string | null
    numero_notti?: IntNullableWithAggregatesFilter<"ServiziATerra"> | number | null
    numero_camere?: IntNullableWithAggregatesFilter<"ServiziATerra"> | number | null
    totale?: FloatNullableWithAggregatesFilter<"ServiziATerra"> | number | null
    valuta?: StringNullableWithAggregatesFilter<"ServiziATerra"> | string | null
    cambio?: FloatNullableWithAggregatesFilter<"ServiziATerra"> | number | null
    servizio_aggiuntivo?: BoolNullableWithAggregatesFilter<"ServiziATerra"> | boolean | null
  }

  export type VoloWhereInput = {
    AND?: VoloWhereInput | VoloWhereInput[]
    OR?: VoloWhereInput[]
    NOT?: VoloWhereInput | VoloWhereInput[]
    id?: StringFilter<"Volo"> | string
    id_preventivo?: StringFilter<"Volo"> | string
    id_fornitore?: StringNullableFilter<"Volo"> | string | null
    compagnia_aerea?: StringNullableFilter<"Volo"> | string | null
    descrizione?: StringNullableFilter<"Volo"> | string | null
    data_partenza?: DateTimeNullableFilter<"Volo"> | Date | string | null
    data_arrivo?: DateTimeNullableFilter<"Volo"> | Date | string | null
    totale?: FloatNullableFilter<"Volo"> | number | null
    ricarico?: FloatNullableFilter<"Volo"> | number | null
    numero?: IntNullableFilter<"Volo"> | number | null
    valuta?: StringNullableFilter<"Volo"> | string | null
    cambio?: FloatNullableFilter<"Volo"> | number | null
    preventivo?: XOR<PreventivoScalarRelationFilter, PreventivoWhereInput>
    fornitore?: XOR<FornitoreNullableScalarRelationFilter, FornitoreWhereInput> | null
  }

  export type VoloOrderByWithRelationInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrderInput | SortOrder
    compagnia_aerea?: SortOrderInput | SortOrder
    descrizione?: SortOrderInput | SortOrder
    data_partenza?: SortOrderInput | SortOrder
    data_arrivo?: SortOrderInput | SortOrder
    totale?: SortOrderInput | SortOrder
    ricarico?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    valuta?: SortOrderInput | SortOrder
    cambio?: SortOrderInput | SortOrder
    preventivo?: PreventivoOrderByWithRelationInput
    fornitore?: FornitoreOrderByWithRelationInput
  }

  export type VoloWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VoloWhereInput | VoloWhereInput[]
    OR?: VoloWhereInput[]
    NOT?: VoloWhereInput | VoloWhereInput[]
    id_preventivo?: StringFilter<"Volo"> | string
    id_fornitore?: StringNullableFilter<"Volo"> | string | null
    compagnia_aerea?: StringNullableFilter<"Volo"> | string | null
    descrizione?: StringNullableFilter<"Volo"> | string | null
    data_partenza?: DateTimeNullableFilter<"Volo"> | Date | string | null
    data_arrivo?: DateTimeNullableFilter<"Volo"> | Date | string | null
    totale?: FloatNullableFilter<"Volo"> | number | null
    ricarico?: FloatNullableFilter<"Volo"> | number | null
    numero?: IntNullableFilter<"Volo"> | number | null
    valuta?: StringNullableFilter<"Volo"> | string | null
    cambio?: FloatNullableFilter<"Volo"> | number | null
    preventivo?: XOR<PreventivoScalarRelationFilter, PreventivoWhereInput>
    fornitore?: XOR<FornitoreNullableScalarRelationFilter, FornitoreWhereInput> | null
  }, "id">

  export type VoloOrderByWithAggregationInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrderInput | SortOrder
    compagnia_aerea?: SortOrderInput | SortOrder
    descrizione?: SortOrderInput | SortOrder
    data_partenza?: SortOrderInput | SortOrder
    data_arrivo?: SortOrderInput | SortOrder
    totale?: SortOrderInput | SortOrder
    ricarico?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    valuta?: SortOrderInput | SortOrder
    cambio?: SortOrderInput | SortOrder
    _count?: VoloCountOrderByAggregateInput
    _avg?: VoloAvgOrderByAggregateInput
    _max?: VoloMaxOrderByAggregateInput
    _min?: VoloMinOrderByAggregateInput
    _sum?: VoloSumOrderByAggregateInput
  }

  export type VoloScalarWhereWithAggregatesInput = {
    AND?: VoloScalarWhereWithAggregatesInput | VoloScalarWhereWithAggregatesInput[]
    OR?: VoloScalarWhereWithAggregatesInput[]
    NOT?: VoloScalarWhereWithAggregatesInput | VoloScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Volo"> | string
    id_preventivo?: StringWithAggregatesFilter<"Volo"> | string
    id_fornitore?: StringNullableWithAggregatesFilter<"Volo"> | string | null
    compagnia_aerea?: StringNullableWithAggregatesFilter<"Volo"> | string | null
    descrizione?: StringNullableWithAggregatesFilter<"Volo"> | string | null
    data_partenza?: DateTimeNullableWithAggregatesFilter<"Volo"> | Date | string | null
    data_arrivo?: DateTimeNullableWithAggregatesFilter<"Volo"> | Date | string | null
    totale?: FloatNullableWithAggregatesFilter<"Volo"> | number | null
    ricarico?: FloatNullableWithAggregatesFilter<"Volo"> | number | null
    numero?: IntNullableWithAggregatesFilter<"Volo"> | number | null
    valuta?: StringNullableWithAggregatesFilter<"Volo"> | string | null
    cambio?: FloatNullableWithAggregatesFilter<"Volo"> | number | null
  }

  export type AssicurazioneWhereInput = {
    AND?: AssicurazioneWhereInput | AssicurazioneWhereInput[]
    OR?: AssicurazioneWhereInput[]
    NOT?: AssicurazioneWhereInput | AssicurazioneWhereInput[]
    id?: StringFilter<"Assicurazione"> | string
    id_preventivo?: StringFilter<"Assicurazione"> | string
    id_fornitore?: StringNullableFilter<"Assicurazione"> | string | null
    assicurazione?: StringNullableFilter<"Assicurazione"> | string | null
    netto?: FloatNullableFilter<"Assicurazione"> | number | null
    ricarico?: FloatNullableFilter<"Assicurazione"> | number | null
    numero?: IntNullableFilter<"Assicurazione"> | number | null
    preventivo?: XOR<PreventivoScalarRelationFilter, PreventivoWhereInput>
    fornitore?: XOR<FornitoreNullableScalarRelationFilter, FornitoreWhereInput> | null
  }

  export type AssicurazioneOrderByWithRelationInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrderInput | SortOrder
    assicurazione?: SortOrderInput | SortOrder
    netto?: SortOrderInput | SortOrder
    ricarico?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    preventivo?: PreventivoOrderByWithRelationInput
    fornitore?: FornitoreOrderByWithRelationInput
  }

  export type AssicurazioneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssicurazioneWhereInput | AssicurazioneWhereInput[]
    OR?: AssicurazioneWhereInput[]
    NOT?: AssicurazioneWhereInput | AssicurazioneWhereInput[]
    id_preventivo?: StringFilter<"Assicurazione"> | string
    id_fornitore?: StringNullableFilter<"Assicurazione"> | string | null
    assicurazione?: StringNullableFilter<"Assicurazione"> | string | null
    netto?: FloatNullableFilter<"Assicurazione"> | number | null
    ricarico?: FloatNullableFilter<"Assicurazione"> | number | null
    numero?: IntNullableFilter<"Assicurazione"> | number | null
    preventivo?: XOR<PreventivoScalarRelationFilter, PreventivoWhereInput>
    fornitore?: XOR<FornitoreNullableScalarRelationFilter, FornitoreWhereInput> | null
  }, "id">

  export type AssicurazioneOrderByWithAggregationInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrderInput | SortOrder
    assicurazione?: SortOrderInput | SortOrder
    netto?: SortOrderInput | SortOrder
    ricarico?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    _count?: AssicurazioneCountOrderByAggregateInput
    _avg?: AssicurazioneAvgOrderByAggregateInput
    _max?: AssicurazioneMaxOrderByAggregateInput
    _min?: AssicurazioneMinOrderByAggregateInput
    _sum?: AssicurazioneSumOrderByAggregateInput
  }

  export type AssicurazioneScalarWhereWithAggregatesInput = {
    AND?: AssicurazioneScalarWhereWithAggregatesInput | AssicurazioneScalarWhereWithAggregatesInput[]
    OR?: AssicurazioneScalarWhereWithAggregatesInput[]
    NOT?: AssicurazioneScalarWhereWithAggregatesInput | AssicurazioneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assicurazione"> | string
    id_preventivo?: StringWithAggregatesFilter<"Assicurazione"> | string
    id_fornitore?: StringNullableWithAggregatesFilter<"Assicurazione"> | string | null
    assicurazione?: StringNullableWithAggregatesFilter<"Assicurazione"> | string | null
    netto?: FloatNullableWithAggregatesFilter<"Assicurazione"> | number | null
    ricarico?: FloatNullableWithAggregatesFilter<"Assicurazione"> | number | null
    numero?: IntNullableWithAggregatesFilter<"Assicurazione"> | number | null
  }

  export type PreventivoAlClienteWhereInput = {
    AND?: PreventivoAlClienteWhereInput | PreventivoAlClienteWhereInput[]
    OR?: PreventivoAlClienteWhereInput[]
    NOT?: PreventivoAlClienteWhereInput | PreventivoAlClienteWhereInput[]
    id?: StringFilter<"PreventivoAlCliente"> | string
    id_preventivo?: StringNullableFilter<"PreventivoAlCliente"> | string | null
    descrizione_viaggio?: StringNullableFilter<"PreventivoAlCliente"> | string | null
    preventivo?: XOR<PreventivoNullableScalarRelationFilter, PreventivoWhereInput> | null
    rows?: PreventivoAlClienteRowListRelationFilter
  }

  export type PreventivoAlClienteOrderByWithRelationInput = {
    id?: SortOrder
    id_preventivo?: SortOrderInput | SortOrder
    descrizione_viaggio?: SortOrderInput | SortOrder
    preventivo?: PreventivoOrderByWithRelationInput
    rows?: PreventivoAlClienteRowOrderByRelationAggregateInput
  }

  export type PreventivoAlClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PreventivoAlClienteWhereInput | PreventivoAlClienteWhereInput[]
    OR?: PreventivoAlClienteWhereInput[]
    NOT?: PreventivoAlClienteWhereInput | PreventivoAlClienteWhereInput[]
    id_preventivo?: StringNullableFilter<"PreventivoAlCliente"> | string | null
    descrizione_viaggio?: StringNullableFilter<"PreventivoAlCliente"> | string | null
    preventivo?: XOR<PreventivoNullableScalarRelationFilter, PreventivoWhereInput> | null
    rows?: PreventivoAlClienteRowListRelationFilter
  }, "id">

  export type PreventivoAlClienteOrderByWithAggregationInput = {
    id?: SortOrder
    id_preventivo?: SortOrderInput | SortOrder
    descrizione_viaggio?: SortOrderInput | SortOrder
    _count?: PreventivoAlClienteCountOrderByAggregateInput
    _max?: PreventivoAlClienteMaxOrderByAggregateInput
    _min?: PreventivoAlClienteMinOrderByAggregateInput
  }

  export type PreventivoAlClienteScalarWhereWithAggregatesInput = {
    AND?: PreventivoAlClienteScalarWhereWithAggregatesInput | PreventivoAlClienteScalarWhereWithAggregatesInput[]
    OR?: PreventivoAlClienteScalarWhereWithAggregatesInput[]
    NOT?: PreventivoAlClienteScalarWhereWithAggregatesInput | PreventivoAlClienteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PreventivoAlCliente"> | string
    id_preventivo?: StringNullableWithAggregatesFilter<"PreventivoAlCliente"> | string | null
    descrizione_viaggio?: StringNullableWithAggregatesFilter<"PreventivoAlCliente"> | string | null
  }

  export type PreventivoAlClienteRowWhereInput = {
    AND?: PreventivoAlClienteRowWhereInput | PreventivoAlClienteRowWhereInput[]
    OR?: PreventivoAlClienteRowWhereInput[]
    NOT?: PreventivoAlClienteRowWhereInput | PreventivoAlClienteRowWhereInput[]
    id?: StringFilter<"PreventivoAlClienteRow"> | string
    id_preventivo_al_cliente?: StringFilter<"PreventivoAlClienteRow"> | string
    senza_assicurazione?: BoolNullableFilter<"PreventivoAlClienteRow"> | boolean | null
    destinazione?: StringNullableFilter<"PreventivoAlClienteRow"> | string | null
    descrizione?: StringNullableFilter<"PreventivoAlClienteRow"> | string | null
    individuale?: FloatNullableFilter<"PreventivoAlClienteRow"> | number | null
    numero?: IntNullableFilter<"PreventivoAlClienteRow"> | number | null
    preventivoAlCliente?: XOR<PreventivoAlClienteScalarRelationFilter, PreventivoAlClienteWhereInput>
  }

  export type PreventivoAlClienteRowOrderByWithRelationInput = {
    id?: SortOrder
    id_preventivo_al_cliente?: SortOrder
    senza_assicurazione?: SortOrderInput | SortOrder
    destinazione?: SortOrderInput | SortOrder
    descrizione?: SortOrderInput | SortOrder
    individuale?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    preventivoAlCliente?: PreventivoAlClienteOrderByWithRelationInput
  }

  export type PreventivoAlClienteRowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PreventivoAlClienteRowWhereInput | PreventivoAlClienteRowWhereInput[]
    OR?: PreventivoAlClienteRowWhereInput[]
    NOT?: PreventivoAlClienteRowWhereInput | PreventivoAlClienteRowWhereInput[]
    id_preventivo_al_cliente?: StringFilter<"PreventivoAlClienteRow"> | string
    senza_assicurazione?: BoolNullableFilter<"PreventivoAlClienteRow"> | boolean | null
    destinazione?: StringNullableFilter<"PreventivoAlClienteRow"> | string | null
    descrizione?: StringNullableFilter<"PreventivoAlClienteRow"> | string | null
    individuale?: FloatNullableFilter<"PreventivoAlClienteRow"> | number | null
    numero?: IntNullableFilter<"PreventivoAlClienteRow"> | number | null
    preventivoAlCliente?: XOR<PreventivoAlClienteScalarRelationFilter, PreventivoAlClienteWhereInput>
  }, "id">

  export type PreventivoAlClienteRowOrderByWithAggregationInput = {
    id?: SortOrder
    id_preventivo_al_cliente?: SortOrder
    senza_assicurazione?: SortOrderInput | SortOrder
    destinazione?: SortOrderInput | SortOrder
    descrizione?: SortOrderInput | SortOrder
    individuale?: SortOrderInput | SortOrder
    numero?: SortOrderInput | SortOrder
    _count?: PreventivoAlClienteRowCountOrderByAggregateInput
    _avg?: PreventivoAlClienteRowAvgOrderByAggregateInput
    _max?: PreventivoAlClienteRowMaxOrderByAggregateInput
    _min?: PreventivoAlClienteRowMinOrderByAggregateInput
    _sum?: PreventivoAlClienteRowSumOrderByAggregateInput
  }

  export type PreventivoAlClienteRowScalarWhereWithAggregatesInput = {
    AND?: PreventivoAlClienteRowScalarWhereWithAggregatesInput | PreventivoAlClienteRowScalarWhereWithAggregatesInput[]
    OR?: PreventivoAlClienteRowScalarWhereWithAggregatesInput[]
    NOT?: PreventivoAlClienteRowScalarWhereWithAggregatesInput | PreventivoAlClienteRowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PreventivoAlClienteRow"> | string
    id_preventivo_al_cliente?: StringWithAggregatesFilter<"PreventivoAlClienteRow"> | string
    senza_assicurazione?: BoolNullableWithAggregatesFilter<"PreventivoAlClienteRow"> | boolean | null
    destinazione?: StringNullableWithAggregatesFilter<"PreventivoAlClienteRow"> | string | null
    descrizione?: StringNullableWithAggregatesFilter<"PreventivoAlClienteRow"> | string | null
    individuale?: FloatNullableWithAggregatesFilter<"PreventivoAlClienteRow"> | number | null
    numero?: IntNullableWithAggregatesFilter<"PreventivoAlClienteRow"> | number | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type DestinazioneCreateInput = {
    id?: string
    nome: string
    serviziATerra?: ServiziATerraCreateNestedManyWithoutDestinazioneInput
  }

  export type DestinazioneUncheckedCreateInput = {
    id?: string
    nome: string
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutDestinazioneInput
  }

  export type DestinazioneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    serviziATerra?: ServiziATerraUpdateManyWithoutDestinazioneNestedInput
  }

  export type DestinazioneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutDestinazioneNestedInput
  }

  export type DestinazioneCreateManyInput = {
    id?: string
    nome: string
  }

  export type DestinazioneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type DestinazioneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type BancaCreateInput = {
    id?: string
    nome: string
  }

  export type BancaUncheckedCreateInput = {
    id?: string
    nome: string
  }

  export type BancaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type BancaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type BancaCreateManyInput = {
    id?: string
    nome: string
  }

  export type BancaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type BancaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type ClienteCreateInput = {
    id?: string
    nome?: string | null
    cognome?: string | null
    tel?: string | null
    indirizzo?: string | null
    CAP?: string | null
    citta?: string | null
    CF?: string | null
    email: string
    tipo?: string | null
    provenienza?: string | null
    collegato?: string | null
    note?: string | null
    data_di_nascita?: Date | string | null
    luogo_nascita?: string | null
    provincia_nascita?: string | null
    numero_passaporto?: string | null
    data_scadenza_passaporto?: Date | string | null
    nazionalita?: string | null
    provincia?: string | null
    sesso?: string | null
    preventivi?: PreventivoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateInput = {
    id?: string
    nome?: string | null
    cognome?: string | null
    tel?: string | null
    indirizzo?: string | null
    CAP?: string | null
    citta?: string | null
    CF?: string | null
    email: string
    tipo?: string | null
    provenienza?: string | null
    collegato?: string | null
    note?: string | null
    data_di_nascita?: Date | string | null
    luogo_nascita?: string | null
    provincia_nascita?: string | null
    numero_passaporto?: string | null
    data_scadenza_passaporto?: Date | string | null
    nazionalita?: string | null
    provincia?: string | null
    sesso?: string | null
    preventivi?: PreventivoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cognome?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    indirizzo?: NullableStringFieldUpdateOperationsInput | string | null
    CAP?: NullableStringFieldUpdateOperationsInput | string | null
    citta?: NullableStringFieldUpdateOperationsInput | string | null
    CF?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
    provenienza?: NullableStringFieldUpdateOperationsInput | string | null
    collegato?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    data_di_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    luogo_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    numero_passaporto?: NullableStringFieldUpdateOperationsInput | string | null
    data_scadenza_passaporto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nazionalita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia?: NullableStringFieldUpdateOperationsInput | string | null
    sesso?: NullableStringFieldUpdateOperationsInput | string | null
    preventivi?: PreventivoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cognome?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    indirizzo?: NullableStringFieldUpdateOperationsInput | string | null
    CAP?: NullableStringFieldUpdateOperationsInput | string | null
    citta?: NullableStringFieldUpdateOperationsInput | string | null
    CF?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
    provenienza?: NullableStringFieldUpdateOperationsInput | string | null
    collegato?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    data_di_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    luogo_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    numero_passaporto?: NullableStringFieldUpdateOperationsInput | string | null
    data_scadenza_passaporto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nazionalita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia?: NullableStringFieldUpdateOperationsInput | string | null
    sesso?: NullableStringFieldUpdateOperationsInput | string | null
    preventivi?: PreventivoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteCreateManyInput = {
    id?: string
    nome?: string | null
    cognome?: string | null
    tel?: string | null
    indirizzo?: string | null
    CAP?: string | null
    citta?: string | null
    CF?: string | null
    email: string
    tipo?: string | null
    provenienza?: string | null
    collegato?: string | null
    note?: string | null
    data_di_nascita?: Date | string | null
    luogo_nascita?: string | null
    provincia_nascita?: string | null
    numero_passaporto?: string | null
    data_scadenza_passaporto?: Date | string | null
    nazionalita?: string | null
    provincia?: string | null
    sesso?: string | null
  }

  export type ClienteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cognome?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    indirizzo?: NullableStringFieldUpdateOperationsInput | string | null
    CAP?: NullableStringFieldUpdateOperationsInput | string | null
    citta?: NullableStringFieldUpdateOperationsInput | string | null
    CF?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
    provenienza?: NullableStringFieldUpdateOperationsInput | string | null
    collegato?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    data_di_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    luogo_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    numero_passaporto?: NullableStringFieldUpdateOperationsInput | string | null
    data_scadenza_passaporto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nazionalita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia?: NullableStringFieldUpdateOperationsInput | string | null
    sesso?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cognome?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    indirizzo?: NullableStringFieldUpdateOperationsInput | string | null
    CAP?: NullableStringFieldUpdateOperationsInput | string | null
    citta?: NullableStringFieldUpdateOperationsInput | string | null
    CF?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
    provenienza?: NullableStringFieldUpdateOperationsInput | string | null
    collegato?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    data_di_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    luogo_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    numero_passaporto?: NullableStringFieldUpdateOperationsInput | string | null
    data_scadenza_passaporto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nazionalita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia?: NullableStringFieldUpdateOperationsInput | string | null
    sesso?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FornitoreCreateInput = {
    id?: string
    nome: string
    valuta?: string | null
    serviziATerra?: ServiziATerraCreateNestedManyWithoutFornitoreInput
    voli?: VoloCreateNestedManyWithoutFornitoreInput
    assicurazioni?: AssicurazioneCreateNestedManyWithoutFornitoreInput
  }

  export type FornitoreUncheckedCreateInput = {
    id?: string
    nome: string
    valuta?: string | null
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutFornitoreInput
    voli?: VoloUncheckedCreateNestedManyWithoutFornitoreInput
    assicurazioni?: AssicurazioneUncheckedCreateNestedManyWithoutFornitoreInput
  }

  export type FornitoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUpdateManyWithoutFornitoreNestedInput
    voli?: VoloUpdateManyWithoutFornitoreNestedInput
    assicurazioni?: AssicurazioneUpdateManyWithoutFornitoreNestedInput
  }

  export type FornitoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutFornitoreNestedInput
    voli?: VoloUncheckedUpdateManyWithoutFornitoreNestedInput
    assicurazioni?: AssicurazioneUncheckedUpdateManyWithoutFornitoreNestedInput
  }

  export type FornitoreCreateManyInput = {
    id?: string
    nome: string
    valuta?: string | null
  }

  export type FornitoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FornitoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PreventivoCreateInput = {
    id?: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    cliente: ClienteCreateNestedOneWithoutPreventiviInput
    serviziATerra?: ServiziATerraCreateNestedManyWithoutPreventivoInput
    voli?: VoloCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoUncheckedCreateInput = {
    id?: string
    id_cliente: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutPreventivoInput
    voli?: VoloUncheckedCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneUncheckedCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: ClienteUpdateOneRequiredWithoutPreventiviNestedInput
    serviziATerra?: ServiziATerraUpdateManyWithoutPreventivoNestedInput
    voli?: VoloUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_cliente?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutPreventivoNestedInput
    voli?: VoloUncheckedUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUncheckedUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoCreateManyInput = {
    id?: string
    id_cliente: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
  }

  export type PreventivoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PreventivoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_cliente?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiziATerraCreateInput = {
    id?: string
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
    preventivo: PreventivoCreateNestedOneWithoutServiziATerraInput
    fornitore?: FornitoreCreateNestedOneWithoutServiziATerraInput
    destinazione?: DestinazioneCreateNestedOneWithoutServiziATerraInput
  }

  export type ServiziATerraUncheckedCreateInput = {
    id?: string
    id_preventivo: string
    id_fornitore?: string | null
    id_destinazione?: string | null
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  export type ServiziATerraUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preventivo?: PreventivoUpdateOneRequiredWithoutServiziATerraNestedInput
    fornitore?: FornitoreUpdateOneWithoutServiziATerraNestedInput
    destinazione?: DestinazioneUpdateOneWithoutServiziATerraNestedInput
  }

  export type ServiziATerraUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    id_destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ServiziATerraCreateManyInput = {
    id?: string
    id_preventivo: string
    id_fornitore?: string | null
    id_destinazione?: string | null
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  export type ServiziATerraUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ServiziATerraUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    id_destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type VoloCreateInput = {
    id?: string
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
    preventivo: PreventivoCreateNestedOneWithoutVoliInput
    fornitore?: FornitoreCreateNestedOneWithoutVoliInput
  }

  export type VoloUncheckedCreateInput = {
    id?: string
    id_preventivo: string
    id_fornitore?: string | null
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
  }

  export type VoloUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    preventivo?: PreventivoUpdateOneRequiredWithoutVoliNestedInput
    fornitore?: FornitoreUpdateOneWithoutVoliNestedInput
  }

  export type VoloUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type VoloCreateManyInput = {
    id?: string
    id_preventivo: string
    id_fornitore?: string | null
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
  }

  export type VoloUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type VoloUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AssicurazioneCreateInput = {
    id?: string
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
    preventivo: PreventivoCreateNestedOneWithoutAssicurazioniInput
    fornitore?: FornitoreCreateNestedOneWithoutAssicurazioniInput
  }

  export type AssicurazioneUncheckedCreateInput = {
    id?: string
    id_preventivo: string
    id_fornitore?: string | null
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
  }

  export type AssicurazioneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    preventivo?: PreventivoUpdateOneRequiredWithoutAssicurazioniNestedInput
    fornitore?: FornitoreUpdateOneWithoutAssicurazioniNestedInput
  }

  export type AssicurazioneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssicurazioneCreateManyInput = {
    id?: string
    id_preventivo: string
    id_fornitore?: string | null
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
  }

  export type AssicurazioneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssicurazioneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PreventivoAlClienteCreateInput = {
    id?: string
    descrizione_viaggio?: string | null
    preventivo?: PreventivoCreateNestedOneWithoutPreventiviAlClienteInput
    rows?: PreventivoAlClienteRowCreateNestedManyWithoutPreventivoAlClienteInput
  }

  export type PreventivoAlClienteUncheckedCreateInput = {
    id?: string
    id_preventivo?: string | null
    descrizione_viaggio?: string | null
    rows?: PreventivoAlClienteRowUncheckedCreateNestedManyWithoutPreventivoAlClienteInput
  }

  export type PreventivoAlClienteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    preventivo?: PreventivoUpdateOneWithoutPreventiviAlClienteNestedInput
    rows?: PreventivoAlClienteRowUpdateManyWithoutPreventivoAlClienteNestedInput
  }

  export type PreventivoAlClienteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    rows?: PreventivoAlClienteRowUncheckedUpdateManyWithoutPreventivoAlClienteNestedInput
  }

  export type PreventivoAlClienteCreateManyInput = {
    id?: string
    id_preventivo?: string | null
    descrizione_viaggio?: string | null
  }

  export type PreventivoAlClienteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PreventivoAlClienteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PreventivoAlClienteRowCreateInput = {
    id?: string
    senza_assicurazione?: boolean | null
    destinazione?: string | null
    descrizione?: string | null
    individuale?: number | null
    numero?: number | null
    preventivoAlCliente: PreventivoAlClienteCreateNestedOneWithoutRowsInput
  }

  export type PreventivoAlClienteRowUncheckedCreateInput = {
    id?: string
    id_preventivo_al_cliente: string
    senza_assicurazione?: boolean | null
    destinazione?: string | null
    descrizione?: string | null
    individuale?: number | null
    numero?: number | null
  }

  export type PreventivoAlClienteRowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senza_assicurazione?: NullableBoolFieldUpdateOperationsInput | boolean | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    individuale?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    preventivoAlCliente?: PreventivoAlClienteUpdateOneRequiredWithoutRowsNestedInput
  }

  export type PreventivoAlClienteRowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo_al_cliente?: StringFieldUpdateOperationsInput | string
    senza_assicurazione?: NullableBoolFieldUpdateOperationsInput | boolean | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    individuale?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PreventivoAlClienteRowCreateManyInput = {
    id?: string
    id_preventivo_al_cliente: string
    senza_assicurazione?: boolean | null
    destinazione?: string | null
    descrizione?: string | null
    individuale?: number | null
    numero?: number | null
  }

  export type PreventivoAlClienteRowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senza_assicurazione?: NullableBoolFieldUpdateOperationsInput | boolean | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    individuale?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PreventivoAlClienteRowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo_al_cliente?: StringFieldUpdateOperationsInput | string
    senza_assicurazione?: NullableBoolFieldUpdateOperationsInput | boolean | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    individuale?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type ServiziATerraListRelationFilter = {
    every?: ServiziATerraWhereInput
    some?: ServiziATerraWhereInput
    none?: ServiziATerraWhereInput
  }

  export type ServiziATerraOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DestinazioneCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type DestinazioneMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type DestinazioneMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type BancaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type BancaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type BancaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PreventivoListRelationFilter = {
    every?: PreventivoWhereInput
    some?: PreventivoWhereInput
    none?: PreventivoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PreventivoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cognome?: SortOrder
    tel?: SortOrder
    indirizzo?: SortOrder
    CAP?: SortOrder
    citta?: SortOrder
    CF?: SortOrder
    email?: SortOrder
    tipo?: SortOrder
    provenienza?: SortOrder
    collegato?: SortOrder
    note?: SortOrder
    data_di_nascita?: SortOrder
    luogo_nascita?: SortOrder
    provincia_nascita?: SortOrder
    numero_passaporto?: SortOrder
    data_scadenza_passaporto?: SortOrder
    nazionalita?: SortOrder
    provincia?: SortOrder
    sesso?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cognome?: SortOrder
    tel?: SortOrder
    indirizzo?: SortOrder
    CAP?: SortOrder
    citta?: SortOrder
    CF?: SortOrder
    email?: SortOrder
    tipo?: SortOrder
    provenienza?: SortOrder
    collegato?: SortOrder
    note?: SortOrder
    data_di_nascita?: SortOrder
    luogo_nascita?: SortOrder
    provincia_nascita?: SortOrder
    numero_passaporto?: SortOrder
    data_scadenza_passaporto?: SortOrder
    nazionalita?: SortOrder
    provincia?: SortOrder
    sesso?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cognome?: SortOrder
    tel?: SortOrder
    indirizzo?: SortOrder
    CAP?: SortOrder
    citta?: SortOrder
    CF?: SortOrder
    email?: SortOrder
    tipo?: SortOrder
    provenienza?: SortOrder
    collegato?: SortOrder
    note?: SortOrder
    data_di_nascita?: SortOrder
    luogo_nascita?: SortOrder
    provincia_nascita?: SortOrder
    numero_passaporto?: SortOrder
    data_scadenza_passaporto?: SortOrder
    nazionalita?: SortOrder
    provincia?: SortOrder
    sesso?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VoloListRelationFilter = {
    every?: VoloWhereInput
    some?: VoloWhereInput
    none?: VoloWhereInput
  }

  export type AssicurazioneListRelationFilter = {
    every?: AssicurazioneWhereInput
    some?: AssicurazioneWhereInput
    none?: AssicurazioneWhereInput
  }

  export type VoloOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssicurazioneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FornitoreCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    valuta?: SortOrder
  }

  export type FornitoreMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    valuta?: SortOrder
  }

  export type FornitoreMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    valuta?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClienteScalarRelationFilter = {
    is?: ClienteWhereInput
    isNot?: ClienteWhereInput
  }

  export type PreventivoAlClienteListRelationFilter = {
    every?: PreventivoAlClienteWhereInput
    some?: PreventivoAlClienteWhereInput
    none?: PreventivoAlClienteWhereInput
  }

  export type PreventivoAlClienteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PreventivoCountOrderByAggregateInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    percentuale_ricarico?: SortOrder
    note?: SortOrder
    brand?: SortOrder
    adulti?: SortOrder
    bambini?: SortOrder
    destinazione?: SortOrder
    tipo_viaggio?: SortOrder
    note_operative?: SortOrder
    riferimento?: SortOrder
    data_partenza?: SortOrder
    operatore?: SortOrder
    feedback?: SortOrder
    stato?: SortOrder
    data?: SortOrder
    numero_preventivo?: SortOrder
  }

  export type PreventivoAvgOrderByAggregateInput = {
    percentuale_ricarico?: SortOrder
    adulti?: SortOrder
    bambini?: SortOrder
  }

  export type PreventivoMaxOrderByAggregateInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    percentuale_ricarico?: SortOrder
    note?: SortOrder
    brand?: SortOrder
    adulti?: SortOrder
    bambini?: SortOrder
    destinazione?: SortOrder
    tipo_viaggio?: SortOrder
    note_operative?: SortOrder
    riferimento?: SortOrder
    data_partenza?: SortOrder
    operatore?: SortOrder
    feedback?: SortOrder
    stato?: SortOrder
    data?: SortOrder
    numero_preventivo?: SortOrder
  }

  export type PreventivoMinOrderByAggregateInput = {
    id?: SortOrder
    id_cliente?: SortOrder
    percentuale_ricarico?: SortOrder
    note?: SortOrder
    brand?: SortOrder
    adulti?: SortOrder
    bambini?: SortOrder
    destinazione?: SortOrder
    tipo_viaggio?: SortOrder
    note_operative?: SortOrder
    riferimento?: SortOrder
    data_partenza?: SortOrder
    operatore?: SortOrder
    feedback?: SortOrder
    stato?: SortOrder
    data?: SortOrder
    numero_preventivo?: SortOrder
  }

  export type PreventivoSumOrderByAggregateInput = {
    percentuale_ricarico?: SortOrder
    adulti?: SortOrder
    bambini?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type PreventivoScalarRelationFilter = {
    is?: PreventivoWhereInput
    isNot?: PreventivoWhereInput
  }

  export type FornitoreNullableScalarRelationFilter = {
    is?: FornitoreWhereInput | null
    isNot?: FornitoreWhereInput | null
  }

  export type DestinazioneNullableScalarRelationFilter = {
    is?: DestinazioneWhereInput | null
    isNot?: DestinazioneWhereInput | null
  }

  export type ServiziATerraCountOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    id_destinazione?: SortOrder
    descrizione?: SortOrder
    data?: SortOrder
    numero_notti?: SortOrder
    numero_camere?: SortOrder
    totale?: SortOrder
    valuta?: SortOrder
    cambio?: SortOrder
    servizio_aggiuntivo?: SortOrder
  }

  export type ServiziATerraAvgOrderByAggregateInput = {
    numero_notti?: SortOrder
    numero_camere?: SortOrder
    totale?: SortOrder
    cambio?: SortOrder
  }

  export type ServiziATerraMaxOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    id_destinazione?: SortOrder
    descrizione?: SortOrder
    data?: SortOrder
    numero_notti?: SortOrder
    numero_camere?: SortOrder
    totale?: SortOrder
    valuta?: SortOrder
    cambio?: SortOrder
    servizio_aggiuntivo?: SortOrder
  }

  export type ServiziATerraMinOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    id_destinazione?: SortOrder
    descrizione?: SortOrder
    data?: SortOrder
    numero_notti?: SortOrder
    numero_camere?: SortOrder
    totale?: SortOrder
    valuta?: SortOrder
    cambio?: SortOrder
    servizio_aggiuntivo?: SortOrder
  }

  export type ServiziATerraSumOrderByAggregateInput = {
    numero_notti?: SortOrder
    numero_camere?: SortOrder
    totale?: SortOrder
    cambio?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type VoloCountOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    compagnia_aerea?: SortOrder
    descrizione?: SortOrder
    data_partenza?: SortOrder
    data_arrivo?: SortOrder
    totale?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
    valuta?: SortOrder
    cambio?: SortOrder
  }

  export type VoloAvgOrderByAggregateInput = {
    totale?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
    cambio?: SortOrder
  }

  export type VoloMaxOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    compagnia_aerea?: SortOrder
    descrizione?: SortOrder
    data_partenza?: SortOrder
    data_arrivo?: SortOrder
    totale?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
    valuta?: SortOrder
    cambio?: SortOrder
  }

  export type VoloMinOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    compagnia_aerea?: SortOrder
    descrizione?: SortOrder
    data_partenza?: SortOrder
    data_arrivo?: SortOrder
    totale?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
    valuta?: SortOrder
    cambio?: SortOrder
  }

  export type VoloSumOrderByAggregateInput = {
    totale?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
    cambio?: SortOrder
  }

  export type AssicurazioneCountOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    assicurazione?: SortOrder
    netto?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
  }

  export type AssicurazioneAvgOrderByAggregateInput = {
    netto?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
  }

  export type AssicurazioneMaxOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    assicurazione?: SortOrder
    netto?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
  }

  export type AssicurazioneMinOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    id_fornitore?: SortOrder
    assicurazione?: SortOrder
    netto?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
  }

  export type AssicurazioneSumOrderByAggregateInput = {
    netto?: SortOrder
    ricarico?: SortOrder
    numero?: SortOrder
  }

  export type PreventivoNullableScalarRelationFilter = {
    is?: PreventivoWhereInput | null
    isNot?: PreventivoWhereInput | null
  }

  export type PreventivoAlClienteRowListRelationFilter = {
    every?: PreventivoAlClienteRowWhereInput
    some?: PreventivoAlClienteRowWhereInput
    none?: PreventivoAlClienteRowWhereInput
  }

  export type PreventivoAlClienteRowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PreventivoAlClienteCountOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    descrizione_viaggio?: SortOrder
  }

  export type PreventivoAlClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    descrizione_viaggio?: SortOrder
  }

  export type PreventivoAlClienteMinOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo?: SortOrder
    descrizione_viaggio?: SortOrder
  }

  export type PreventivoAlClienteScalarRelationFilter = {
    is?: PreventivoAlClienteWhereInput
    isNot?: PreventivoAlClienteWhereInput
  }

  export type PreventivoAlClienteRowCountOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo_al_cliente?: SortOrder
    senza_assicurazione?: SortOrder
    destinazione?: SortOrder
    descrizione?: SortOrder
    individuale?: SortOrder
    numero?: SortOrder
  }

  export type PreventivoAlClienteRowAvgOrderByAggregateInput = {
    individuale?: SortOrder
    numero?: SortOrder
  }

  export type PreventivoAlClienteRowMaxOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo_al_cliente?: SortOrder
    senza_assicurazione?: SortOrder
    destinazione?: SortOrder
    descrizione?: SortOrder
    individuale?: SortOrder
    numero?: SortOrder
  }

  export type PreventivoAlClienteRowMinOrderByAggregateInput = {
    id?: SortOrder
    id_preventivo_al_cliente?: SortOrder
    senza_assicurazione?: SortOrder
    destinazione?: SortOrder
    descrizione?: SortOrder
    individuale?: SortOrder
    numero?: SortOrder
  }

  export type PreventivoAlClienteRowSumOrderByAggregateInput = {
    individuale?: SortOrder
    numero?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ServiziATerraCreateNestedManyWithoutDestinazioneInput = {
    create?: XOR<ServiziATerraCreateWithoutDestinazioneInput, ServiziATerraUncheckedCreateWithoutDestinazioneInput> | ServiziATerraCreateWithoutDestinazioneInput[] | ServiziATerraUncheckedCreateWithoutDestinazioneInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutDestinazioneInput | ServiziATerraCreateOrConnectWithoutDestinazioneInput[]
    createMany?: ServiziATerraCreateManyDestinazioneInputEnvelope
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
  }

  export type ServiziATerraUncheckedCreateNestedManyWithoutDestinazioneInput = {
    create?: XOR<ServiziATerraCreateWithoutDestinazioneInput, ServiziATerraUncheckedCreateWithoutDestinazioneInput> | ServiziATerraCreateWithoutDestinazioneInput[] | ServiziATerraUncheckedCreateWithoutDestinazioneInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutDestinazioneInput | ServiziATerraCreateOrConnectWithoutDestinazioneInput[]
    createMany?: ServiziATerraCreateManyDestinazioneInputEnvelope
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
  }

  export type ServiziATerraUpdateManyWithoutDestinazioneNestedInput = {
    create?: XOR<ServiziATerraCreateWithoutDestinazioneInput, ServiziATerraUncheckedCreateWithoutDestinazioneInput> | ServiziATerraCreateWithoutDestinazioneInput[] | ServiziATerraUncheckedCreateWithoutDestinazioneInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutDestinazioneInput | ServiziATerraCreateOrConnectWithoutDestinazioneInput[]
    upsert?: ServiziATerraUpsertWithWhereUniqueWithoutDestinazioneInput | ServiziATerraUpsertWithWhereUniqueWithoutDestinazioneInput[]
    createMany?: ServiziATerraCreateManyDestinazioneInputEnvelope
    set?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    disconnect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    delete?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    update?: ServiziATerraUpdateWithWhereUniqueWithoutDestinazioneInput | ServiziATerraUpdateWithWhereUniqueWithoutDestinazioneInput[]
    updateMany?: ServiziATerraUpdateManyWithWhereWithoutDestinazioneInput | ServiziATerraUpdateManyWithWhereWithoutDestinazioneInput[]
    deleteMany?: ServiziATerraScalarWhereInput | ServiziATerraScalarWhereInput[]
  }

  export type ServiziATerraUncheckedUpdateManyWithoutDestinazioneNestedInput = {
    create?: XOR<ServiziATerraCreateWithoutDestinazioneInput, ServiziATerraUncheckedCreateWithoutDestinazioneInput> | ServiziATerraCreateWithoutDestinazioneInput[] | ServiziATerraUncheckedCreateWithoutDestinazioneInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutDestinazioneInput | ServiziATerraCreateOrConnectWithoutDestinazioneInput[]
    upsert?: ServiziATerraUpsertWithWhereUniqueWithoutDestinazioneInput | ServiziATerraUpsertWithWhereUniqueWithoutDestinazioneInput[]
    createMany?: ServiziATerraCreateManyDestinazioneInputEnvelope
    set?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    disconnect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    delete?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    update?: ServiziATerraUpdateWithWhereUniqueWithoutDestinazioneInput | ServiziATerraUpdateWithWhereUniqueWithoutDestinazioneInput[]
    updateMany?: ServiziATerraUpdateManyWithWhereWithoutDestinazioneInput | ServiziATerraUpdateManyWithWhereWithoutDestinazioneInput[]
    deleteMany?: ServiziATerraScalarWhereInput | ServiziATerraScalarWhereInput[]
  }

  export type PreventivoCreateNestedManyWithoutClienteInput = {
    create?: XOR<PreventivoCreateWithoutClienteInput, PreventivoUncheckedCreateWithoutClienteInput> | PreventivoCreateWithoutClienteInput[] | PreventivoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PreventivoCreateOrConnectWithoutClienteInput | PreventivoCreateOrConnectWithoutClienteInput[]
    createMany?: PreventivoCreateManyClienteInputEnvelope
    connect?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
  }

  export type PreventivoUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<PreventivoCreateWithoutClienteInput, PreventivoUncheckedCreateWithoutClienteInput> | PreventivoCreateWithoutClienteInput[] | PreventivoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PreventivoCreateOrConnectWithoutClienteInput | PreventivoCreateOrConnectWithoutClienteInput[]
    createMany?: PreventivoCreateManyClienteInputEnvelope
    connect?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PreventivoUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PreventivoCreateWithoutClienteInput, PreventivoUncheckedCreateWithoutClienteInput> | PreventivoCreateWithoutClienteInput[] | PreventivoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PreventivoCreateOrConnectWithoutClienteInput | PreventivoCreateOrConnectWithoutClienteInput[]
    upsert?: PreventivoUpsertWithWhereUniqueWithoutClienteInput | PreventivoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PreventivoCreateManyClienteInputEnvelope
    set?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
    disconnect?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
    delete?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
    connect?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
    update?: PreventivoUpdateWithWhereUniqueWithoutClienteInput | PreventivoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PreventivoUpdateManyWithWhereWithoutClienteInput | PreventivoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PreventivoScalarWhereInput | PreventivoScalarWhereInput[]
  }

  export type PreventivoUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PreventivoCreateWithoutClienteInput, PreventivoUncheckedCreateWithoutClienteInput> | PreventivoCreateWithoutClienteInput[] | PreventivoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PreventivoCreateOrConnectWithoutClienteInput | PreventivoCreateOrConnectWithoutClienteInput[]
    upsert?: PreventivoUpsertWithWhereUniqueWithoutClienteInput | PreventivoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PreventivoCreateManyClienteInputEnvelope
    set?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
    disconnect?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
    delete?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
    connect?: PreventivoWhereUniqueInput | PreventivoWhereUniqueInput[]
    update?: PreventivoUpdateWithWhereUniqueWithoutClienteInput | PreventivoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PreventivoUpdateManyWithWhereWithoutClienteInput | PreventivoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PreventivoScalarWhereInput | PreventivoScalarWhereInput[]
  }

  export type ServiziATerraCreateNestedManyWithoutFornitoreInput = {
    create?: XOR<ServiziATerraCreateWithoutFornitoreInput, ServiziATerraUncheckedCreateWithoutFornitoreInput> | ServiziATerraCreateWithoutFornitoreInput[] | ServiziATerraUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutFornitoreInput | ServiziATerraCreateOrConnectWithoutFornitoreInput[]
    createMany?: ServiziATerraCreateManyFornitoreInputEnvelope
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
  }

  export type VoloCreateNestedManyWithoutFornitoreInput = {
    create?: XOR<VoloCreateWithoutFornitoreInput, VoloUncheckedCreateWithoutFornitoreInput> | VoloCreateWithoutFornitoreInput[] | VoloUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: VoloCreateOrConnectWithoutFornitoreInput | VoloCreateOrConnectWithoutFornitoreInput[]
    createMany?: VoloCreateManyFornitoreInputEnvelope
    connect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
  }

  export type AssicurazioneCreateNestedManyWithoutFornitoreInput = {
    create?: XOR<AssicurazioneCreateWithoutFornitoreInput, AssicurazioneUncheckedCreateWithoutFornitoreInput> | AssicurazioneCreateWithoutFornitoreInput[] | AssicurazioneUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: AssicurazioneCreateOrConnectWithoutFornitoreInput | AssicurazioneCreateOrConnectWithoutFornitoreInput[]
    createMany?: AssicurazioneCreateManyFornitoreInputEnvelope
    connect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
  }

  export type ServiziATerraUncheckedCreateNestedManyWithoutFornitoreInput = {
    create?: XOR<ServiziATerraCreateWithoutFornitoreInput, ServiziATerraUncheckedCreateWithoutFornitoreInput> | ServiziATerraCreateWithoutFornitoreInput[] | ServiziATerraUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutFornitoreInput | ServiziATerraCreateOrConnectWithoutFornitoreInput[]
    createMany?: ServiziATerraCreateManyFornitoreInputEnvelope
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
  }

  export type VoloUncheckedCreateNestedManyWithoutFornitoreInput = {
    create?: XOR<VoloCreateWithoutFornitoreInput, VoloUncheckedCreateWithoutFornitoreInput> | VoloCreateWithoutFornitoreInput[] | VoloUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: VoloCreateOrConnectWithoutFornitoreInput | VoloCreateOrConnectWithoutFornitoreInput[]
    createMany?: VoloCreateManyFornitoreInputEnvelope
    connect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
  }

  export type AssicurazioneUncheckedCreateNestedManyWithoutFornitoreInput = {
    create?: XOR<AssicurazioneCreateWithoutFornitoreInput, AssicurazioneUncheckedCreateWithoutFornitoreInput> | AssicurazioneCreateWithoutFornitoreInput[] | AssicurazioneUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: AssicurazioneCreateOrConnectWithoutFornitoreInput | AssicurazioneCreateOrConnectWithoutFornitoreInput[]
    createMany?: AssicurazioneCreateManyFornitoreInputEnvelope
    connect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
  }

  export type ServiziATerraUpdateManyWithoutFornitoreNestedInput = {
    create?: XOR<ServiziATerraCreateWithoutFornitoreInput, ServiziATerraUncheckedCreateWithoutFornitoreInput> | ServiziATerraCreateWithoutFornitoreInput[] | ServiziATerraUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutFornitoreInput | ServiziATerraCreateOrConnectWithoutFornitoreInput[]
    upsert?: ServiziATerraUpsertWithWhereUniqueWithoutFornitoreInput | ServiziATerraUpsertWithWhereUniqueWithoutFornitoreInput[]
    createMany?: ServiziATerraCreateManyFornitoreInputEnvelope
    set?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    disconnect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    delete?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    update?: ServiziATerraUpdateWithWhereUniqueWithoutFornitoreInput | ServiziATerraUpdateWithWhereUniqueWithoutFornitoreInput[]
    updateMany?: ServiziATerraUpdateManyWithWhereWithoutFornitoreInput | ServiziATerraUpdateManyWithWhereWithoutFornitoreInput[]
    deleteMany?: ServiziATerraScalarWhereInput | ServiziATerraScalarWhereInput[]
  }

  export type VoloUpdateManyWithoutFornitoreNestedInput = {
    create?: XOR<VoloCreateWithoutFornitoreInput, VoloUncheckedCreateWithoutFornitoreInput> | VoloCreateWithoutFornitoreInput[] | VoloUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: VoloCreateOrConnectWithoutFornitoreInput | VoloCreateOrConnectWithoutFornitoreInput[]
    upsert?: VoloUpsertWithWhereUniqueWithoutFornitoreInput | VoloUpsertWithWhereUniqueWithoutFornitoreInput[]
    createMany?: VoloCreateManyFornitoreInputEnvelope
    set?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    disconnect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    delete?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    connect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    update?: VoloUpdateWithWhereUniqueWithoutFornitoreInput | VoloUpdateWithWhereUniqueWithoutFornitoreInput[]
    updateMany?: VoloUpdateManyWithWhereWithoutFornitoreInput | VoloUpdateManyWithWhereWithoutFornitoreInput[]
    deleteMany?: VoloScalarWhereInput | VoloScalarWhereInput[]
  }

  export type AssicurazioneUpdateManyWithoutFornitoreNestedInput = {
    create?: XOR<AssicurazioneCreateWithoutFornitoreInput, AssicurazioneUncheckedCreateWithoutFornitoreInput> | AssicurazioneCreateWithoutFornitoreInput[] | AssicurazioneUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: AssicurazioneCreateOrConnectWithoutFornitoreInput | AssicurazioneCreateOrConnectWithoutFornitoreInput[]
    upsert?: AssicurazioneUpsertWithWhereUniqueWithoutFornitoreInput | AssicurazioneUpsertWithWhereUniqueWithoutFornitoreInput[]
    createMany?: AssicurazioneCreateManyFornitoreInputEnvelope
    set?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    disconnect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    delete?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    connect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    update?: AssicurazioneUpdateWithWhereUniqueWithoutFornitoreInput | AssicurazioneUpdateWithWhereUniqueWithoutFornitoreInput[]
    updateMany?: AssicurazioneUpdateManyWithWhereWithoutFornitoreInput | AssicurazioneUpdateManyWithWhereWithoutFornitoreInput[]
    deleteMany?: AssicurazioneScalarWhereInput | AssicurazioneScalarWhereInput[]
  }

  export type ServiziATerraUncheckedUpdateManyWithoutFornitoreNestedInput = {
    create?: XOR<ServiziATerraCreateWithoutFornitoreInput, ServiziATerraUncheckedCreateWithoutFornitoreInput> | ServiziATerraCreateWithoutFornitoreInput[] | ServiziATerraUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutFornitoreInput | ServiziATerraCreateOrConnectWithoutFornitoreInput[]
    upsert?: ServiziATerraUpsertWithWhereUniqueWithoutFornitoreInput | ServiziATerraUpsertWithWhereUniqueWithoutFornitoreInput[]
    createMany?: ServiziATerraCreateManyFornitoreInputEnvelope
    set?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    disconnect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    delete?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    update?: ServiziATerraUpdateWithWhereUniqueWithoutFornitoreInput | ServiziATerraUpdateWithWhereUniqueWithoutFornitoreInput[]
    updateMany?: ServiziATerraUpdateManyWithWhereWithoutFornitoreInput | ServiziATerraUpdateManyWithWhereWithoutFornitoreInput[]
    deleteMany?: ServiziATerraScalarWhereInput | ServiziATerraScalarWhereInput[]
  }

  export type VoloUncheckedUpdateManyWithoutFornitoreNestedInput = {
    create?: XOR<VoloCreateWithoutFornitoreInput, VoloUncheckedCreateWithoutFornitoreInput> | VoloCreateWithoutFornitoreInput[] | VoloUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: VoloCreateOrConnectWithoutFornitoreInput | VoloCreateOrConnectWithoutFornitoreInput[]
    upsert?: VoloUpsertWithWhereUniqueWithoutFornitoreInput | VoloUpsertWithWhereUniqueWithoutFornitoreInput[]
    createMany?: VoloCreateManyFornitoreInputEnvelope
    set?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    disconnect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    delete?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    connect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    update?: VoloUpdateWithWhereUniqueWithoutFornitoreInput | VoloUpdateWithWhereUniqueWithoutFornitoreInput[]
    updateMany?: VoloUpdateManyWithWhereWithoutFornitoreInput | VoloUpdateManyWithWhereWithoutFornitoreInput[]
    deleteMany?: VoloScalarWhereInput | VoloScalarWhereInput[]
  }

  export type AssicurazioneUncheckedUpdateManyWithoutFornitoreNestedInput = {
    create?: XOR<AssicurazioneCreateWithoutFornitoreInput, AssicurazioneUncheckedCreateWithoutFornitoreInput> | AssicurazioneCreateWithoutFornitoreInput[] | AssicurazioneUncheckedCreateWithoutFornitoreInput[]
    connectOrCreate?: AssicurazioneCreateOrConnectWithoutFornitoreInput | AssicurazioneCreateOrConnectWithoutFornitoreInput[]
    upsert?: AssicurazioneUpsertWithWhereUniqueWithoutFornitoreInput | AssicurazioneUpsertWithWhereUniqueWithoutFornitoreInput[]
    createMany?: AssicurazioneCreateManyFornitoreInputEnvelope
    set?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    disconnect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    delete?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    connect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    update?: AssicurazioneUpdateWithWhereUniqueWithoutFornitoreInput | AssicurazioneUpdateWithWhereUniqueWithoutFornitoreInput[]
    updateMany?: AssicurazioneUpdateManyWithWhereWithoutFornitoreInput | AssicurazioneUpdateManyWithWhereWithoutFornitoreInput[]
    deleteMany?: AssicurazioneScalarWhereInput | AssicurazioneScalarWhereInput[]
  }

  export type ClienteCreateNestedOneWithoutPreventiviInput = {
    create?: XOR<ClienteCreateWithoutPreventiviInput, ClienteUncheckedCreateWithoutPreventiviInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutPreventiviInput
    connect?: ClienteWhereUniqueInput
  }

  export type ServiziATerraCreateNestedManyWithoutPreventivoInput = {
    create?: XOR<ServiziATerraCreateWithoutPreventivoInput, ServiziATerraUncheckedCreateWithoutPreventivoInput> | ServiziATerraCreateWithoutPreventivoInput[] | ServiziATerraUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutPreventivoInput | ServiziATerraCreateOrConnectWithoutPreventivoInput[]
    createMany?: ServiziATerraCreateManyPreventivoInputEnvelope
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
  }

  export type VoloCreateNestedManyWithoutPreventivoInput = {
    create?: XOR<VoloCreateWithoutPreventivoInput, VoloUncheckedCreateWithoutPreventivoInput> | VoloCreateWithoutPreventivoInput[] | VoloUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: VoloCreateOrConnectWithoutPreventivoInput | VoloCreateOrConnectWithoutPreventivoInput[]
    createMany?: VoloCreateManyPreventivoInputEnvelope
    connect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
  }

  export type AssicurazioneCreateNestedManyWithoutPreventivoInput = {
    create?: XOR<AssicurazioneCreateWithoutPreventivoInput, AssicurazioneUncheckedCreateWithoutPreventivoInput> | AssicurazioneCreateWithoutPreventivoInput[] | AssicurazioneUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: AssicurazioneCreateOrConnectWithoutPreventivoInput | AssicurazioneCreateOrConnectWithoutPreventivoInput[]
    createMany?: AssicurazioneCreateManyPreventivoInputEnvelope
    connect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
  }

  export type PreventivoAlClienteCreateNestedManyWithoutPreventivoInput = {
    create?: XOR<PreventivoAlClienteCreateWithoutPreventivoInput, PreventivoAlClienteUncheckedCreateWithoutPreventivoInput> | PreventivoAlClienteCreateWithoutPreventivoInput[] | PreventivoAlClienteUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: PreventivoAlClienteCreateOrConnectWithoutPreventivoInput | PreventivoAlClienteCreateOrConnectWithoutPreventivoInput[]
    createMany?: PreventivoAlClienteCreateManyPreventivoInputEnvelope
    connect?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
  }

  export type ServiziATerraUncheckedCreateNestedManyWithoutPreventivoInput = {
    create?: XOR<ServiziATerraCreateWithoutPreventivoInput, ServiziATerraUncheckedCreateWithoutPreventivoInput> | ServiziATerraCreateWithoutPreventivoInput[] | ServiziATerraUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutPreventivoInput | ServiziATerraCreateOrConnectWithoutPreventivoInput[]
    createMany?: ServiziATerraCreateManyPreventivoInputEnvelope
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
  }

  export type VoloUncheckedCreateNestedManyWithoutPreventivoInput = {
    create?: XOR<VoloCreateWithoutPreventivoInput, VoloUncheckedCreateWithoutPreventivoInput> | VoloCreateWithoutPreventivoInput[] | VoloUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: VoloCreateOrConnectWithoutPreventivoInput | VoloCreateOrConnectWithoutPreventivoInput[]
    createMany?: VoloCreateManyPreventivoInputEnvelope
    connect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
  }

  export type AssicurazioneUncheckedCreateNestedManyWithoutPreventivoInput = {
    create?: XOR<AssicurazioneCreateWithoutPreventivoInput, AssicurazioneUncheckedCreateWithoutPreventivoInput> | AssicurazioneCreateWithoutPreventivoInput[] | AssicurazioneUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: AssicurazioneCreateOrConnectWithoutPreventivoInput | AssicurazioneCreateOrConnectWithoutPreventivoInput[]
    createMany?: AssicurazioneCreateManyPreventivoInputEnvelope
    connect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
  }

  export type PreventivoAlClienteUncheckedCreateNestedManyWithoutPreventivoInput = {
    create?: XOR<PreventivoAlClienteCreateWithoutPreventivoInput, PreventivoAlClienteUncheckedCreateWithoutPreventivoInput> | PreventivoAlClienteCreateWithoutPreventivoInput[] | PreventivoAlClienteUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: PreventivoAlClienteCreateOrConnectWithoutPreventivoInput | PreventivoAlClienteCreateOrConnectWithoutPreventivoInput[]
    createMany?: PreventivoAlClienteCreateManyPreventivoInputEnvelope
    connect?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClienteUpdateOneRequiredWithoutPreventiviNestedInput = {
    create?: XOR<ClienteCreateWithoutPreventiviInput, ClienteUncheckedCreateWithoutPreventiviInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutPreventiviInput
    upsert?: ClienteUpsertWithoutPreventiviInput
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutPreventiviInput, ClienteUpdateWithoutPreventiviInput>, ClienteUncheckedUpdateWithoutPreventiviInput>
  }

  export type ServiziATerraUpdateManyWithoutPreventivoNestedInput = {
    create?: XOR<ServiziATerraCreateWithoutPreventivoInput, ServiziATerraUncheckedCreateWithoutPreventivoInput> | ServiziATerraCreateWithoutPreventivoInput[] | ServiziATerraUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutPreventivoInput | ServiziATerraCreateOrConnectWithoutPreventivoInput[]
    upsert?: ServiziATerraUpsertWithWhereUniqueWithoutPreventivoInput | ServiziATerraUpsertWithWhereUniqueWithoutPreventivoInput[]
    createMany?: ServiziATerraCreateManyPreventivoInputEnvelope
    set?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    disconnect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    delete?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    update?: ServiziATerraUpdateWithWhereUniqueWithoutPreventivoInput | ServiziATerraUpdateWithWhereUniqueWithoutPreventivoInput[]
    updateMany?: ServiziATerraUpdateManyWithWhereWithoutPreventivoInput | ServiziATerraUpdateManyWithWhereWithoutPreventivoInput[]
    deleteMany?: ServiziATerraScalarWhereInput | ServiziATerraScalarWhereInput[]
  }

  export type VoloUpdateManyWithoutPreventivoNestedInput = {
    create?: XOR<VoloCreateWithoutPreventivoInput, VoloUncheckedCreateWithoutPreventivoInput> | VoloCreateWithoutPreventivoInput[] | VoloUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: VoloCreateOrConnectWithoutPreventivoInput | VoloCreateOrConnectWithoutPreventivoInput[]
    upsert?: VoloUpsertWithWhereUniqueWithoutPreventivoInput | VoloUpsertWithWhereUniqueWithoutPreventivoInput[]
    createMany?: VoloCreateManyPreventivoInputEnvelope
    set?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    disconnect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    delete?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    connect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    update?: VoloUpdateWithWhereUniqueWithoutPreventivoInput | VoloUpdateWithWhereUniqueWithoutPreventivoInput[]
    updateMany?: VoloUpdateManyWithWhereWithoutPreventivoInput | VoloUpdateManyWithWhereWithoutPreventivoInput[]
    deleteMany?: VoloScalarWhereInput | VoloScalarWhereInput[]
  }

  export type AssicurazioneUpdateManyWithoutPreventivoNestedInput = {
    create?: XOR<AssicurazioneCreateWithoutPreventivoInput, AssicurazioneUncheckedCreateWithoutPreventivoInput> | AssicurazioneCreateWithoutPreventivoInput[] | AssicurazioneUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: AssicurazioneCreateOrConnectWithoutPreventivoInput | AssicurazioneCreateOrConnectWithoutPreventivoInput[]
    upsert?: AssicurazioneUpsertWithWhereUniqueWithoutPreventivoInput | AssicurazioneUpsertWithWhereUniqueWithoutPreventivoInput[]
    createMany?: AssicurazioneCreateManyPreventivoInputEnvelope
    set?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    disconnect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    delete?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    connect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    update?: AssicurazioneUpdateWithWhereUniqueWithoutPreventivoInput | AssicurazioneUpdateWithWhereUniqueWithoutPreventivoInput[]
    updateMany?: AssicurazioneUpdateManyWithWhereWithoutPreventivoInput | AssicurazioneUpdateManyWithWhereWithoutPreventivoInput[]
    deleteMany?: AssicurazioneScalarWhereInput | AssicurazioneScalarWhereInput[]
  }

  export type PreventivoAlClienteUpdateManyWithoutPreventivoNestedInput = {
    create?: XOR<PreventivoAlClienteCreateWithoutPreventivoInput, PreventivoAlClienteUncheckedCreateWithoutPreventivoInput> | PreventivoAlClienteCreateWithoutPreventivoInput[] | PreventivoAlClienteUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: PreventivoAlClienteCreateOrConnectWithoutPreventivoInput | PreventivoAlClienteCreateOrConnectWithoutPreventivoInput[]
    upsert?: PreventivoAlClienteUpsertWithWhereUniqueWithoutPreventivoInput | PreventivoAlClienteUpsertWithWhereUniqueWithoutPreventivoInput[]
    createMany?: PreventivoAlClienteCreateManyPreventivoInputEnvelope
    set?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
    disconnect?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
    delete?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
    connect?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
    update?: PreventivoAlClienteUpdateWithWhereUniqueWithoutPreventivoInput | PreventivoAlClienteUpdateWithWhereUniqueWithoutPreventivoInput[]
    updateMany?: PreventivoAlClienteUpdateManyWithWhereWithoutPreventivoInput | PreventivoAlClienteUpdateManyWithWhereWithoutPreventivoInput[]
    deleteMany?: PreventivoAlClienteScalarWhereInput | PreventivoAlClienteScalarWhereInput[]
  }

  export type ServiziATerraUncheckedUpdateManyWithoutPreventivoNestedInput = {
    create?: XOR<ServiziATerraCreateWithoutPreventivoInput, ServiziATerraUncheckedCreateWithoutPreventivoInput> | ServiziATerraCreateWithoutPreventivoInput[] | ServiziATerraUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: ServiziATerraCreateOrConnectWithoutPreventivoInput | ServiziATerraCreateOrConnectWithoutPreventivoInput[]
    upsert?: ServiziATerraUpsertWithWhereUniqueWithoutPreventivoInput | ServiziATerraUpsertWithWhereUniqueWithoutPreventivoInput[]
    createMany?: ServiziATerraCreateManyPreventivoInputEnvelope
    set?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    disconnect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    delete?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    connect?: ServiziATerraWhereUniqueInput | ServiziATerraWhereUniqueInput[]
    update?: ServiziATerraUpdateWithWhereUniqueWithoutPreventivoInput | ServiziATerraUpdateWithWhereUniqueWithoutPreventivoInput[]
    updateMany?: ServiziATerraUpdateManyWithWhereWithoutPreventivoInput | ServiziATerraUpdateManyWithWhereWithoutPreventivoInput[]
    deleteMany?: ServiziATerraScalarWhereInput | ServiziATerraScalarWhereInput[]
  }

  export type VoloUncheckedUpdateManyWithoutPreventivoNestedInput = {
    create?: XOR<VoloCreateWithoutPreventivoInput, VoloUncheckedCreateWithoutPreventivoInput> | VoloCreateWithoutPreventivoInput[] | VoloUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: VoloCreateOrConnectWithoutPreventivoInput | VoloCreateOrConnectWithoutPreventivoInput[]
    upsert?: VoloUpsertWithWhereUniqueWithoutPreventivoInput | VoloUpsertWithWhereUniqueWithoutPreventivoInput[]
    createMany?: VoloCreateManyPreventivoInputEnvelope
    set?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    disconnect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    delete?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    connect?: VoloWhereUniqueInput | VoloWhereUniqueInput[]
    update?: VoloUpdateWithWhereUniqueWithoutPreventivoInput | VoloUpdateWithWhereUniqueWithoutPreventivoInput[]
    updateMany?: VoloUpdateManyWithWhereWithoutPreventivoInput | VoloUpdateManyWithWhereWithoutPreventivoInput[]
    deleteMany?: VoloScalarWhereInput | VoloScalarWhereInput[]
  }

  export type AssicurazioneUncheckedUpdateManyWithoutPreventivoNestedInput = {
    create?: XOR<AssicurazioneCreateWithoutPreventivoInput, AssicurazioneUncheckedCreateWithoutPreventivoInput> | AssicurazioneCreateWithoutPreventivoInput[] | AssicurazioneUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: AssicurazioneCreateOrConnectWithoutPreventivoInput | AssicurazioneCreateOrConnectWithoutPreventivoInput[]
    upsert?: AssicurazioneUpsertWithWhereUniqueWithoutPreventivoInput | AssicurazioneUpsertWithWhereUniqueWithoutPreventivoInput[]
    createMany?: AssicurazioneCreateManyPreventivoInputEnvelope
    set?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    disconnect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    delete?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    connect?: AssicurazioneWhereUniqueInput | AssicurazioneWhereUniqueInput[]
    update?: AssicurazioneUpdateWithWhereUniqueWithoutPreventivoInput | AssicurazioneUpdateWithWhereUniqueWithoutPreventivoInput[]
    updateMany?: AssicurazioneUpdateManyWithWhereWithoutPreventivoInput | AssicurazioneUpdateManyWithWhereWithoutPreventivoInput[]
    deleteMany?: AssicurazioneScalarWhereInput | AssicurazioneScalarWhereInput[]
  }

  export type PreventivoAlClienteUncheckedUpdateManyWithoutPreventivoNestedInput = {
    create?: XOR<PreventivoAlClienteCreateWithoutPreventivoInput, PreventivoAlClienteUncheckedCreateWithoutPreventivoInput> | PreventivoAlClienteCreateWithoutPreventivoInput[] | PreventivoAlClienteUncheckedCreateWithoutPreventivoInput[]
    connectOrCreate?: PreventivoAlClienteCreateOrConnectWithoutPreventivoInput | PreventivoAlClienteCreateOrConnectWithoutPreventivoInput[]
    upsert?: PreventivoAlClienteUpsertWithWhereUniqueWithoutPreventivoInput | PreventivoAlClienteUpsertWithWhereUniqueWithoutPreventivoInput[]
    createMany?: PreventivoAlClienteCreateManyPreventivoInputEnvelope
    set?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
    disconnect?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
    delete?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
    connect?: PreventivoAlClienteWhereUniqueInput | PreventivoAlClienteWhereUniqueInput[]
    update?: PreventivoAlClienteUpdateWithWhereUniqueWithoutPreventivoInput | PreventivoAlClienteUpdateWithWhereUniqueWithoutPreventivoInput[]
    updateMany?: PreventivoAlClienteUpdateManyWithWhereWithoutPreventivoInput | PreventivoAlClienteUpdateManyWithWhereWithoutPreventivoInput[]
    deleteMany?: PreventivoAlClienteScalarWhereInput | PreventivoAlClienteScalarWhereInput[]
  }

  export type PreventivoCreateNestedOneWithoutServiziATerraInput = {
    create?: XOR<PreventivoCreateWithoutServiziATerraInput, PreventivoUncheckedCreateWithoutServiziATerraInput>
    connectOrCreate?: PreventivoCreateOrConnectWithoutServiziATerraInput
    connect?: PreventivoWhereUniqueInput
  }

  export type FornitoreCreateNestedOneWithoutServiziATerraInput = {
    create?: XOR<FornitoreCreateWithoutServiziATerraInput, FornitoreUncheckedCreateWithoutServiziATerraInput>
    connectOrCreate?: FornitoreCreateOrConnectWithoutServiziATerraInput
    connect?: FornitoreWhereUniqueInput
  }

  export type DestinazioneCreateNestedOneWithoutServiziATerraInput = {
    create?: XOR<DestinazioneCreateWithoutServiziATerraInput, DestinazioneUncheckedCreateWithoutServiziATerraInput>
    connectOrCreate?: DestinazioneCreateOrConnectWithoutServiziATerraInput
    connect?: DestinazioneWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type PreventivoUpdateOneRequiredWithoutServiziATerraNestedInput = {
    create?: XOR<PreventivoCreateWithoutServiziATerraInput, PreventivoUncheckedCreateWithoutServiziATerraInput>
    connectOrCreate?: PreventivoCreateOrConnectWithoutServiziATerraInput
    upsert?: PreventivoUpsertWithoutServiziATerraInput
    connect?: PreventivoWhereUniqueInput
    update?: XOR<XOR<PreventivoUpdateToOneWithWhereWithoutServiziATerraInput, PreventivoUpdateWithoutServiziATerraInput>, PreventivoUncheckedUpdateWithoutServiziATerraInput>
  }

  export type FornitoreUpdateOneWithoutServiziATerraNestedInput = {
    create?: XOR<FornitoreCreateWithoutServiziATerraInput, FornitoreUncheckedCreateWithoutServiziATerraInput>
    connectOrCreate?: FornitoreCreateOrConnectWithoutServiziATerraInput
    upsert?: FornitoreUpsertWithoutServiziATerraInput
    disconnect?: FornitoreWhereInput | boolean
    delete?: FornitoreWhereInput | boolean
    connect?: FornitoreWhereUniqueInput
    update?: XOR<XOR<FornitoreUpdateToOneWithWhereWithoutServiziATerraInput, FornitoreUpdateWithoutServiziATerraInput>, FornitoreUncheckedUpdateWithoutServiziATerraInput>
  }

  export type DestinazioneUpdateOneWithoutServiziATerraNestedInput = {
    create?: XOR<DestinazioneCreateWithoutServiziATerraInput, DestinazioneUncheckedCreateWithoutServiziATerraInput>
    connectOrCreate?: DestinazioneCreateOrConnectWithoutServiziATerraInput
    upsert?: DestinazioneUpsertWithoutServiziATerraInput
    disconnect?: DestinazioneWhereInput | boolean
    delete?: DestinazioneWhereInput | boolean
    connect?: DestinazioneWhereUniqueInput
    update?: XOR<XOR<DestinazioneUpdateToOneWithWhereWithoutServiziATerraInput, DestinazioneUpdateWithoutServiziATerraInput>, DestinazioneUncheckedUpdateWithoutServiziATerraInput>
  }

  export type PreventivoCreateNestedOneWithoutVoliInput = {
    create?: XOR<PreventivoCreateWithoutVoliInput, PreventivoUncheckedCreateWithoutVoliInput>
    connectOrCreate?: PreventivoCreateOrConnectWithoutVoliInput
    connect?: PreventivoWhereUniqueInput
  }

  export type FornitoreCreateNestedOneWithoutVoliInput = {
    create?: XOR<FornitoreCreateWithoutVoliInput, FornitoreUncheckedCreateWithoutVoliInput>
    connectOrCreate?: FornitoreCreateOrConnectWithoutVoliInput
    connect?: FornitoreWhereUniqueInput
  }

  export type PreventivoUpdateOneRequiredWithoutVoliNestedInput = {
    create?: XOR<PreventivoCreateWithoutVoliInput, PreventivoUncheckedCreateWithoutVoliInput>
    connectOrCreate?: PreventivoCreateOrConnectWithoutVoliInput
    upsert?: PreventivoUpsertWithoutVoliInput
    connect?: PreventivoWhereUniqueInput
    update?: XOR<XOR<PreventivoUpdateToOneWithWhereWithoutVoliInput, PreventivoUpdateWithoutVoliInput>, PreventivoUncheckedUpdateWithoutVoliInput>
  }

  export type FornitoreUpdateOneWithoutVoliNestedInput = {
    create?: XOR<FornitoreCreateWithoutVoliInput, FornitoreUncheckedCreateWithoutVoliInput>
    connectOrCreate?: FornitoreCreateOrConnectWithoutVoliInput
    upsert?: FornitoreUpsertWithoutVoliInput
    disconnect?: FornitoreWhereInput | boolean
    delete?: FornitoreWhereInput | boolean
    connect?: FornitoreWhereUniqueInput
    update?: XOR<XOR<FornitoreUpdateToOneWithWhereWithoutVoliInput, FornitoreUpdateWithoutVoliInput>, FornitoreUncheckedUpdateWithoutVoliInput>
  }

  export type PreventivoCreateNestedOneWithoutAssicurazioniInput = {
    create?: XOR<PreventivoCreateWithoutAssicurazioniInput, PreventivoUncheckedCreateWithoutAssicurazioniInput>
    connectOrCreate?: PreventivoCreateOrConnectWithoutAssicurazioniInput
    connect?: PreventivoWhereUniqueInput
  }

  export type FornitoreCreateNestedOneWithoutAssicurazioniInput = {
    create?: XOR<FornitoreCreateWithoutAssicurazioniInput, FornitoreUncheckedCreateWithoutAssicurazioniInput>
    connectOrCreate?: FornitoreCreateOrConnectWithoutAssicurazioniInput
    connect?: FornitoreWhereUniqueInput
  }

  export type PreventivoUpdateOneRequiredWithoutAssicurazioniNestedInput = {
    create?: XOR<PreventivoCreateWithoutAssicurazioniInput, PreventivoUncheckedCreateWithoutAssicurazioniInput>
    connectOrCreate?: PreventivoCreateOrConnectWithoutAssicurazioniInput
    upsert?: PreventivoUpsertWithoutAssicurazioniInput
    connect?: PreventivoWhereUniqueInput
    update?: XOR<XOR<PreventivoUpdateToOneWithWhereWithoutAssicurazioniInput, PreventivoUpdateWithoutAssicurazioniInput>, PreventivoUncheckedUpdateWithoutAssicurazioniInput>
  }

  export type FornitoreUpdateOneWithoutAssicurazioniNestedInput = {
    create?: XOR<FornitoreCreateWithoutAssicurazioniInput, FornitoreUncheckedCreateWithoutAssicurazioniInput>
    connectOrCreate?: FornitoreCreateOrConnectWithoutAssicurazioniInput
    upsert?: FornitoreUpsertWithoutAssicurazioniInput
    disconnect?: FornitoreWhereInput | boolean
    delete?: FornitoreWhereInput | boolean
    connect?: FornitoreWhereUniqueInput
    update?: XOR<XOR<FornitoreUpdateToOneWithWhereWithoutAssicurazioniInput, FornitoreUpdateWithoutAssicurazioniInput>, FornitoreUncheckedUpdateWithoutAssicurazioniInput>
  }

  export type PreventivoCreateNestedOneWithoutPreventiviAlClienteInput = {
    create?: XOR<PreventivoCreateWithoutPreventiviAlClienteInput, PreventivoUncheckedCreateWithoutPreventiviAlClienteInput>
    connectOrCreate?: PreventivoCreateOrConnectWithoutPreventiviAlClienteInput
    connect?: PreventivoWhereUniqueInput
  }

  export type PreventivoAlClienteRowCreateNestedManyWithoutPreventivoAlClienteInput = {
    create?: XOR<PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput, PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput> | PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput[] | PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput[]
    connectOrCreate?: PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput | PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput[]
    createMany?: PreventivoAlClienteRowCreateManyPreventivoAlClienteInputEnvelope
    connect?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
  }

  export type PreventivoAlClienteRowUncheckedCreateNestedManyWithoutPreventivoAlClienteInput = {
    create?: XOR<PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput, PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput> | PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput[] | PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput[]
    connectOrCreate?: PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput | PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput[]
    createMany?: PreventivoAlClienteRowCreateManyPreventivoAlClienteInputEnvelope
    connect?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
  }

  export type PreventivoUpdateOneWithoutPreventiviAlClienteNestedInput = {
    create?: XOR<PreventivoCreateWithoutPreventiviAlClienteInput, PreventivoUncheckedCreateWithoutPreventiviAlClienteInput>
    connectOrCreate?: PreventivoCreateOrConnectWithoutPreventiviAlClienteInput
    upsert?: PreventivoUpsertWithoutPreventiviAlClienteInput
    disconnect?: PreventivoWhereInput | boolean
    delete?: PreventivoWhereInput | boolean
    connect?: PreventivoWhereUniqueInput
    update?: XOR<XOR<PreventivoUpdateToOneWithWhereWithoutPreventiviAlClienteInput, PreventivoUpdateWithoutPreventiviAlClienteInput>, PreventivoUncheckedUpdateWithoutPreventiviAlClienteInput>
  }

  export type PreventivoAlClienteRowUpdateManyWithoutPreventivoAlClienteNestedInput = {
    create?: XOR<PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput, PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput> | PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput[] | PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput[]
    connectOrCreate?: PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput | PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput[]
    upsert?: PreventivoAlClienteRowUpsertWithWhereUniqueWithoutPreventivoAlClienteInput | PreventivoAlClienteRowUpsertWithWhereUniqueWithoutPreventivoAlClienteInput[]
    createMany?: PreventivoAlClienteRowCreateManyPreventivoAlClienteInputEnvelope
    set?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
    disconnect?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
    delete?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
    connect?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
    update?: PreventivoAlClienteRowUpdateWithWhereUniqueWithoutPreventivoAlClienteInput | PreventivoAlClienteRowUpdateWithWhereUniqueWithoutPreventivoAlClienteInput[]
    updateMany?: PreventivoAlClienteRowUpdateManyWithWhereWithoutPreventivoAlClienteInput | PreventivoAlClienteRowUpdateManyWithWhereWithoutPreventivoAlClienteInput[]
    deleteMany?: PreventivoAlClienteRowScalarWhereInput | PreventivoAlClienteRowScalarWhereInput[]
  }

  export type PreventivoAlClienteRowUncheckedUpdateManyWithoutPreventivoAlClienteNestedInput = {
    create?: XOR<PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput, PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput> | PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput[] | PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput[]
    connectOrCreate?: PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput | PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput[]
    upsert?: PreventivoAlClienteRowUpsertWithWhereUniqueWithoutPreventivoAlClienteInput | PreventivoAlClienteRowUpsertWithWhereUniqueWithoutPreventivoAlClienteInput[]
    createMany?: PreventivoAlClienteRowCreateManyPreventivoAlClienteInputEnvelope
    set?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
    disconnect?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
    delete?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
    connect?: PreventivoAlClienteRowWhereUniqueInput | PreventivoAlClienteRowWhereUniqueInput[]
    update?: PreventivoAlClienteRowUpdateWithWhereUniqueWithoutPreventivoAlClienteInput | PreventivoAlClienteRowUpdateWithWhereUniqueWithoutPreventivoAlClienteInput[]
    updateMany?: PreventivoAlClienteRowUpdateManyWithWhereWithoutPreventivoAlClienteInput | PreventivoAlClienteRowUpdateManyWithWhereWithoutPreventivoAlClienteInput[]
    deleteMany?: PreventivoAlClienteRowScalarWhereInput | PreventivoAlClienteRowScalarWhereInput[]
  }

  export type PreventivoAlClienteCreateNestedOneWithoutRowsInput = {
    create?: XOR<PreventivoAlClienteCreateWithoutRowsInput, PreventivoAlClienteUncheckedCreateWithoutRowsInput>
    connectOrCreate?: PreventivoAlClienteCreateOrConnectWithoutRowsInput
    connect?: PreventivoAlClienteWhereUniqueInput
  }

  export type PreventivoAlClienteUpdateOneRequiredWithoutRowsNestedInput = {
    create?: XOR<PreventivoAlClienteCreateWithoutRowsInput, PreventivoAlClienteUncheckedCreateWithoutRowsInput>
    connectOrCreate?: PreventivoAlClienteCreateOrConnectWithoutRowsInput
    upsert?: PreventivoAlClienteUpsertWithoutRowsInput
    connect?: PreventivoAlClienteWhereUniqueInput
    update?: XOR<XOR<PreventivoAlClienteUpdateToOneWithWhereWithoutRowsInput, PreventivoAlClienteUpdateWithoutRowsInput>, PreventivoAlClienteUncheckedUpdateWithoutRowsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ServiziATerraCreateWithoutDestinazioneInput = {
    id?: string
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
    preventivo: PreventivoCreateNestedOneWithoutServiziATerraInput
    fornitore?: FornitoreCreateNestedOneWithoutServiziATerraInput
  }

  export type ServiziATerraUncheckedCreateWithoutDestinazioneInput = {
    id?: string
    id_preventivo: string
    id_fornitore?: string | null
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  export type ServiziATerraCreateOrConnectWithoutDestinazioneInput = {
    where: ServiziATerraWhereUniqueInput
    create: XOR<ServiziATerraCreateWithoutDestinazioneInput, ServiziATerraUncheckedCreateWithoutDestinazioneInput>
  }

  export type ServiziATerraCreateManyDestinazioneInputEnvelope = {
    data: ServiziATerraCreateManyDestinazioneInput | ServiziATerraCreateManyDestinazioneInput[]
  }

  export type ServiziATerraUpsertWithWhereUniqueWithoutDestinazioneInput = {
    where: ServiziATerraWhereUniqueInput
    update: XOR<ServiziATerraUpdateWithoutDestinazioneInput, ServiziATerraUncheckedUpdateWithoutDestinazioneInput>
    create: XOR<ServiziATerraCreateWithoutDestinazioneInput, ServiziATerraUncheckedCreateWithoutDestinazioneInput>
  }

  export type ServiziATerraUpdateWithWhereUniqueWithoutDestinazioneInput = {
    where: ServiziATerraWhereUniqueInput
    data: XOR<ServiziATerraUpdateWithoutDestinazioneInput, ServiziATerraUncheckedUpdateWithoutDestinazioneInput>
  }

  export type ServiziATerraUpdateManyWithWhereWithoutDestinazioneInput = {
    where: ServiziATerraScalarWhereInput
    data: XOR<ServiziATerraUpdateManyMutationInput, ServiziATerraUncheckedUpdateManyWithoutDestinazioneInput>
  }

  export type ServiziATerraScalarWhereInput = {
    AND?: ServiziATerraScalarWhereInput | ServiziATerraScalarWhereInput[]
    OR?: ServiziATerraScalarWhereInput[]
    NOT?: ServiziATerraScalarWhereInput | ServiziATerraScalarWhereInput[]
    id?: StringFilter<"ServiziATerra"> | string
    id_preventivo?: StringFilter<"ServiziATerra"> | string
    id_fornitore?: StringNullableFilter<"ServiziATerra"> | string | null
    id_destinazione?: StringNullableFilter<"ServiziATerra"> | string | null
    descrizione?: StringNullableFilter<"ServiziATerra"> | string | null
    data?: DateTimeNullableFilter<"ServiziATerra"> | Date | string | null
    numero_notti?: IntNullableFilter<"ServiziATerra"> | number | null
    numero_camere?: IntNullableFilter<"ServiziATerra"> | number | null
    totale?: FloatNullableFilter<"ServiziATerra"> | number | null
    valuta?: StringNullableFilter<"ServiziATerra"> | string | null
    cambio?: FloatNullableFilter<"ServiziATerra"> | number | null
    servizio_aggiuntivo?: BoolNullableFilter<"ServiziATerra"> | boolean | null
  }

  export type PreventivoCreateWithoutClienteInput = {
    id?: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    serviziATerra?: ServiziATerraCreateNestedManyWithoutPreventivoInput
    voli?: VoloCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoUncheckedCreateWithoutClienteInput = {
    id?: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutPreventivoInput
    voli?: VoloUncheckedCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneUncheckedCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoCreateOrConnectWithoutClienteInput = {
    where: PreventivoWhereUniqueInput
    create: XOR<PreventivoCreateWithoutClienteInput, PreventivoUncheckedCreateWithoutClienteInput>
  }

  export type PreventivoCreateManyClienteInputEnvelope = {
    data: PreventivoCreateManyClienteInput | PreventivoCreateManyClienteInput[]
  }

  export type PreventivoUpsertWithWhereUniqueWithoutClienteInput = {
    where: PreventivoWhereUniqueInput
    update: XOR<PreventivoUpdateWithoutClienteInput, PreventivoUncheckedUpdateWithoutClienteInput>
    create: XOR<PreventivoCreateWithoutClienteInput, PreventivoUncheckedCreateWithoutClienteInput>
  }

  export type PreventivoUpdateWithWhereUniqueWithoutClienteInput = {
    where: PreventivoWhereUniqueInput
    data: XOR<PreventivoUpdateWithoutClienteInput, PreventivoUncheckedUpdateWithoutClienteInput>
  }

  export type PreventivoUpdateManyWithWhereWithoutClienteInput = {
    where: PreventivoScalarWhereInput
    data: XOR<PreventivoUpdateManyMutationInput, PreventivoUncheckedUpdateManyWithoutClienteInput>
  }

  export type PreventivoScalarWhereInput = {
    AND?: PreventivoScalarWhereInput | PreventivoScalarWhereInput[]
    OR?: PreventivoScalarWhereInput[]
    NOT?: PreventivoScalarWhereInput | PreventivoScalarWhereInput[]
    id?: StringFilter<"Preventivo"> | string
    id_cliente?: StringFilter<"Preventivo"> | string
    percentuale_ricarico?: FloatNullableFilter<"Preventivo"> | number | null
    note?: StringNullableFilter<"Preventivo"> | string | null
    brand?: StringNullableFilter<"Preventivo"> | string | null
    adulti?: IntNullableFilter<"Preventivo"> | number | null
    bambini?: IntNullableFilter<"Preventivo"> | number | null
    destinazione?: StringNullableFilter<"Preventivo"> | string | null
    tipo_viaggio?: StringNullableFilter<"Preventivo"> | string | null
    note_operative?: StringNullableFilter<"Preventivo"> | string | null
    riferimento?: StringNullableFilter<"Preventivo"> | string | null
    data_partenza?: DateTimeNullableFilter<"Preventivo"> | Date | string | null
    operatore?: StringNullableFilter<"Preventivo"> | string | null
    feedback?: StringNullableFilter<"Preventivo"> | string | null
    stato?: StringNullableFilter<"Preventivo"> | string | null
    data?: DateTimeFilter<"Preventivo"> | Date | string
    numero_preventivo?: StringNullableFilter<"Preventivo"> | string | null
  }

  export type ServiziATerraCreateWithoutFornitoreInput = {
    id?: string
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
    preventivo: PreventivoCreateNestedOneWithoutServiziATerraInput
    destinazione?: DestinazioneCreateNestedOneWithoutServiziATerraInput
  }

  export type ServiziATerraUncheckedCreateWithoutFornitoreInput = {
    id?: string
    id_preventivo: string
    id_destinazione?: string | null
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  export type ServiziATerraCreateOrConnectWithoutFornitoreInput = {
    where: ServiziATerraWhereUniqueInput
    create: XOR<ServiziATerraCreateWithoutFornitoreInput, ServiziATerraUncheckedCreateWithoutFornitoreInput>
  }

  export type ServiziATerraCreateManyFornitoreInputEnvelope = {
    data: ServiziATerraCreateManyFornitoreInput | ServiziATerraCreateManyFornitoreInput[]
  }

  export type VoloCreateWithoutFornitoreInput = {
    id?: string
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
    preventivo: PreventivoCreateNestedOneWithoutVoliInput
  }

  export type VoloUncheckedCreateWithoutFornitoreInput = {
    id?: string
    id_preventivo: string
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
  }

  export type VoloCreateOrConnectWithoutFornitoreInput = {
    where: VoloWhereUniqueInput
    create: XOR<VoloCreateWithoutFornitoreInput, VoloUncheckedCreateWithoutFornitoreInput>
  }

  export type VoloCreateManyFornitoreInputEnvelope = {
    data: VoloCreateManyFornitoreInput | VoloCreateManyFornitoreInput[]
  }

  export type AssicurazioneCreateWithoutFornitoreInput = {
    id?: string
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
    preventivo: PreventivoCreateNestedOneWithoutAssicurazioniInput
  }

  export type AssicurazioneUncheckedCreateWithoutFornitoreInput = {
    id?: string
    id_preventivo: string
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
  }

  export type AssicurazioneCreateOrConnectWithoutFornitoreInput = {
    where: AssicurazioneWhereUniqueInput
    create: XOR<AssicurazioneCreateWithoutFornitoreInput, AssicurazioneUncheckedCreateWithoutFornitoreInput>
  }

  export type AssicurazioneCreateManyFornitoreInputEnvelope = {
    data: AssicurazioneCreateManyFornitoreInput | AssicurazioneCreateManyFornitoreInput[]
  }

  export type ServiziATerraUpsertWithWhereUniqueWithoutFornitoreInput = {
    where: ServiziATerraWhereUniqueInput
    update: XOR<ServiziATerraUpdateWithoutFornitoreInput, ServiziATerraUncheckedUpdateWithoutFornitoreInput>
    create: XOR<ServiziATerraCreateWithoutFornitoreInput, ServiziATerraUncheckedCreateWithoutFornitoreInput>
  }

  export type ServiziATerraUpdateWithWhereUniqueWithoutFornitoreInput = {
    where: ServiziATerraWhereUniqueInput
    data: XOR<ServiziATerraUpdateWithoutFornitoreInput, ServiziATerraUncheckedUpdateWithoutFornitoreInput>
  }

  export type ServiziATerraUpdateManyWithWhereWithoutFornitoreInput = {
    where: ServiziATerraScalarWhereInput
    data: XOR<ServiziATerraUpdateManyMutationInput, ServiziATerraUncheckedUpdateManyWithoutFornitoreInput>
  }

  export type VoloUpsertWithWhereUniqueWithoutFornitoreInput = {
    where: VoloWhereUniqueInput
    update: XOR<VoloUpdateWithoutFornitoreInput, VoloUncheckedUpdateWithoutFornitoreInput>
    create: XOR<VoloCreateWithoutFornitoreInput, VoloUncheckedCreateWithoutFornitoreInput>
  }

  export type VoloUpdateWithWhereUniqueWithoutFornitoreInput = {
    where: VoloWhereUniqueInput
    data: XOR<VoloUpdateWithoutFornitoreInput, VoloUncheckedUpdateWithoutFornitoreInput>
  }

  export type VoloUpdateManyWithWhereWithoutFornitoreInput = {
    where: VoloScalarWhereInput
    data: XOR<VoloUpdateManyMutationInput, VoloUncheckedUpdateManyWithoutFornitoreInput>
  }

  export type VoloScalarWhereInput = {
    AND?: VoloScalarWhereInput | VoloScalarWhereInput[]
    OR?: VoloScalarWhereInput[]
    NOT?: VoloScalarWhereInput | VoloScalarWhereInput[]
    id?: StringFilter<"Volo"> | string
    id_preventivo?: StringFilter<"Volo"> | string
    id_fornitore?: StringNullableFilter<"Volo"> | string | null
    compagnia_aerea?: StringNullableFilter<"Volo"> | string | null
    descrizione?: StringNullableFilter<"Volo"> | string | null
    data_partenza?: DateTimeNullableFilter<"Volo"> | Date | string | null
    data_arrivo?: DateTimeNullableFilter<"Volo"> | Date | string | null
    totale?: FloatNullableFilter<"Volo"> | number | null
    ricarico?: FloatNullableFilter<"Volo"> | number | null
    numero?: IntNullableFilter<"Volo"> | number | null
    valuta?: StringNullableFilter<"Volo"> | string | null
    cambio?: FloatNullableFilter<"Volo"> | number | null
  }

  export type AssicurazioneUpsertWithWhereUniqueWithoutFornitoreInput = {
    where: AssicurazioneWhereUniqueInput
    update: XOR<AssicurazioneUpdateWithoutFornitoreInput, AssicurazioneUncheckedUpdateWithoutFornitoreInput>
    create: XOR<AssicurazioneCreateWithoutFornitoreInput, AssicurazioneUncheckedCreateWithoutFornitoreInput>
  }

  export type AssicurazioneUpdateWithWhereUniqueWithoutFornitoreInput = {
    where: AssicurazioneWhereUniqueInput
    data: XOR<AssicurazioneUpdateWithoutFornitoreInput, AssicurazioneUncheckedUpdateWithoutFornitoreInput>
  }

  export type AssicurazioneUpdateManyWithWhereWithoutFornitoreInput = {
    where: AssicurazioneScalarWhereInput
    data: XOR<AssicurazioneUpdateManyMutationInput, AssicurazioneUncheckedUpdateManyWithoutFornitoreInput>
  }

  export type AssicurazioneScalarWhereInput = {
    AND?: AssicurazioneScalarWhereInput | AssicurazioneScalarWhereInput[]
    OR?: AssicurazioneScalarWhereInput[]
    NOT?: AssicurazioneScalarWhereInput | AssicurazioneScalarWhereInput[]
    id?: StringFilter<"Assicurazione"> | string
    id_preventivo?: StringFilter<"Assicurazione"> | string
    id_fornitore?: StringNullableFilter<"Assicurazione"> | string | null
    assicurazione?: StringNullableFilter<"Assicurazione"> | string | null
    netto?: FloatNullableFilter<"Assicurazione"> | number | null
    ricarico?: FloatNullableFilter<"Assicurazione"> | number | null
    numero?: IntNullableFilter<"Assicurazione"> | number | null
  }

  export type ClienteCreateWithoutPreventiviInput = {
    id?: string
    nome?: string | null
    cognome?: string | null
    tel?: string | null
    indirizzo?: string | null
    CAP?: string | null
    citta?: string | null
    CF?: string | null
    email: string
    tipo?: string | null
    provenienza?: string | null
    collegato?: string | null
    note?: string | null
    data_di_nascita?: Date | string | null
    luogo_nascita?: string | null
    provincia_nascita?: string | null
    numero_passaporto?: string | null
    data_scadenza_passaporto?: Date | string | null
    nazionalita?: string | null
    provincia?: string | null
    sesso?: string | null
  }

  export type ClienteUncheckedCreateWithoutPreventiviInput = {
    id?: string
    nome?: string | null
    cognome?: string | null
    tel?: string | null
    indirizzo?: string | null
    CAP?: string | null
    citta?: string | null
    CF?: string | null
    email: string
    tipo?: string | null
    provenienza?: string | null
    collegato?: string | null
    note?: string | null
    data_di_nascita?: Date | string | null
    luogo_nascita?: string | null
    provincia_nascita?: string | null
    numero_passaporto?: string | null
    data_scadenza_passaporto?: Date | string | null
    nazionalita?: string | null
    provincia?: string | null
    sesso?: string | null
  }

  export type ClienteCreateOrConnectWithoutPreventiviInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutPreventiviInput, ClienteUncheckedCreateWithoutPreventiviInput>
  }

  export type ServiziATerraCreateWithoutPreventivoInput = {
    id?: string
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
    fornitore?: FornitoreCreateNestedOneWithoutServiziATerraInput
    destinazione?: DestinazioneCreateNestedOneWithoutServiziATerraInput
  }

  export type ServiziATerraUncheckedCreateWithoutPreventivoInput = {
    id?: string
    id_fornitore?: string | null
    id_destinazione?: string | null
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  export type ServiziATerraCreateOrConnectWithoutPreventivoInput = {
    where: ServiziATerraWhereUniqueInput
    create: XOR<ServiziATerraCreateWithoutPreventivoInput, ServiziATerraUncheckedCreateWithoutPreventivoInput>
  }

  export type ServiziATerraCreateManyPreventivoInputEnvelope = {
    data: ServiziATerraCreateManyPreventivoInput | ServiziATerraCreateManyPreventivoInput[]
  }

  export type VoloCreateWithoutPreventivoInput = {
    id?: string
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
    fornitore?: FornitoreCreateNestedOneWithoutVoliInput
  }

  export type VoloUncheckedCreateWithoutPreventivoInput = {
    id?: string
    id_fornitore?: string | null
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
  }

  export type VoloCreateOrConnectWithoutPreventivoInput = {
    where: VoloWhereUniqueInput
    create: XOR<VoloCreateWithoutPreventivoInput, VoloUncheckedCreateWithoutPreventivoInput>
  }

  export type VoloCreateManyPreventivoInputEnvelope = {
    data: VoloCreateManyPreventivoInput | VoloCreateManyPreventivoInput[]
  }

  export type AssicurazioneCreateWithoutPreventivoInput = {
    id?: string
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
    fornitore?: FornitoreCreateNestedOneWithoutAssicurazioniInput
  }

  export type AssicurazioneUncheckedCreateWithoutPreventivoInput = {
    id?: string
    id_fornitore?: string | null
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
  }

  export type AssicurazioneCreateOrConnectWithoutPreventivoInput = {
    where: AssicurazioneWhereUniqueInput
    create: XOR<AssicurazioneCreateWithoutPreventivoInput, AssicurazioneUncheckedCreateWithoutPreventivoInput>
  }

  export type AssicurazioneCreateManyPreventivoInputEnvelope = {
    data: AssicurazioneCreateManyPreventivoInput | AssicurazioneCreateManyPreventivoInput[]
  }

  export type PreventivoAlClienteCreateWithoutPreventivoInput = {
    id?: string
    descrizione_viaggio?: string | null
    rows?: PreventivoAlClienteRowCreateNestedManyWithoutPreventivoAlClienteInput
  }

  export type PreventivoAlClienteUncheckedCreateWithoutPreventivoInput = {
    id?: string
    descrizione_viaggio?: string | null
    rows?: PreventivoAlClienteRowUncheckedCreateNestedManyWithoutPreventivoAlClienteInput
  }

  export type PreventivoAlClienteCreateOrConnectWithoutPreventivoInput = {
    where: PreventivoAlClienteWhereUniqueInput
    create: XOR<PreventivoAlClienteCreateWithoutPreventivoInput, PreventivoAlClienteUncheckedCreateWithoutPreventivoInput>
  }

  export type PreventivoAlClienteCreateManyPreventivoInputEnvelope = {
    data: PreventivoAlClienteCreateManyPreventivoInput | PreventivoAlClienteCreateManyPreventivoInput[]
  }

  export type ClienteUpsertWithoutPreventiviInput = {
    update: XOR<ClienteUpdateWithoutPreventiviInput, ClienteUncheckedUpdateWithoutPreventiviInput>
    create: XOR<ClienteCreateWithoutPreventiviInput, ClienteUncheckedCreateWithoutPreventiviInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutPreventiviInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutPreventiviInput, ClienteUncheckedUpdateWithoutPreventiviInput>
  }

  export type ClienteUpdateWithoutPreventiviInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cognome?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    indirizzo?: NullableStringFieldUpdateOperationsInput | string | null
    CAP?: NullableStringFieldUpdateOperationsInput | string | null
    citta?: NullableStringFieldUpdateOperationsInput | string | null
    CF?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
    provenienza?: NullableStringFieldUpdateOperationsInput | string | null
    collegato?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    data_di_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    luogo_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    numero_passaporto?: NullableStringFieldUpdateOperationsInput | string | null
    data_scadenza_passaporto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nazionalita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia?: NullableStringFieldUpdateOperationsInput | string | null
    sesso?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClienteUncheckedUpdateWithoutPreventiviInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    cognome?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    indirizzo?: NullableStringFieldUpdateOperationsInput | string | null
    CAP?: NullableStringFieldUpdateOperationsInput | string | null
    citta?: NullableStringFieldUpdateOperationsInput | string | null
    CF?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    tipo?: NullableStringFieldUpdateOperationsInput | string | null
    provenienza?: NullableStringFieldUpdateOperationsInput | string | null
    collegato?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    data_di_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    luogo_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia_nascita?: NullableStringFieldUpdateOperationsInput | string | null
    numero_passaporto?: NullableStringFieldUpdateOperationsInput | string | null
    data_scadenza_passaporto?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nazionalita?: NullableStringFieldUpdateOperationsInput | string | null
    provincia?: NullableStringFieldUpdateOperationsInput | string | null
    sesso?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiziATerraUpsertWithWhereUniqueWithoutPreventivoInput = {
    where: ServiziATerraWhereUniqueInput
    update: XOR<ServiziATerraUpdateWithoutPreventivoInput, ServiziATerraUncheckedUpdateWithoutPreventivoInput>
    create: XOR<ServiziATerraCreateWithoutPreventivoInput, ServiziATerraUncheckedCreateWithoutPreventivoInput>
  }

  export type ServiziATerraUpdateWithWhereUniqueWithoutPreventivoInput = {
    where: ServiziATerraWhereUniqueInput
    data: XOR<ServiziATerraUpdateWithoutPreventivoInput, ServiziATerraUncheckedUpdateWithoutPreventivoInput>
  }

  export type ServiziATerraUpdateManyWithWhereWithoutPreventivoInput = {
    where: ServiziATerraScalarWhereInput
    data: XOR<ServiziATerraUpdateManyMutationInput, ServiziATerraUncheckedUpdateManyWithoutPreventivoInput>
  }

  export type VoloUpsertWithWhereUniqueWithoutPreventivoInput = {
    where: VoloWhereUniqueInput
    update: XOR<VoloUpdateWithoutPreventivoInput, VoloUncheckedUpdateWithoutPreventivoInput>
    create: XOR<VoloCreateWithoutPreventivoInput, VoloUncheckedCreateWithoutPreventivoInput>
  }

  export type VoloUpdateWithWhereUniqueWithoutPreventivoInput = {
    where: VoloWhereUniqueInput
    data: XOR<VoloUpdateWithoutPreventivoInput, VoloUncheckedUpdateWithoutPreventivoInput>
  }

  export type VoloUpdateManyWithWhereWithoutPreventivoInput = {
    where: VoloScalarWhereInput
    data: XOR<VoloUpdateManyMutationInput, VoloUncheckedUpdateManyWithoutPreventivoInput>
  }

  export type AssicurazioneUpsertWithWhereUniqueWithoutPreventivoInput = {
    where: AssicurazioneWhereUniqueInput
    update: XOR<AssicurazioneUpdateWithoutPreventivoInput, AssicurazioneUncheckedUpdateWithoutPreventivoInput>
    create: XOR<AssicurazioneCreateWithoutPreventivoInput, AssicurazioneUncheckedCreateWithoutPreventivoInput>
  }

  export type AssicurazioneUpdateWithWhereUniqueWithoutPreventivoInput = {
    where: AssicurazioneWhereUniqueInput
    data: XOR<AssicurazioneUpdateWithoutPreventivoInput, AssicurazioneUncheckedUpdateWithoutPreventivoInput>
  }

  export type AssicurazioneUpdateManyWithWhereWithoutPreventivoInput = {
    where: AssicurazioneScalarWhereInput
    data: XOR<AssicurazioneUpdateManyMutationInput, AssicurazioneUncheckedUpdateManyWithoutPreventivoInput>
  }

  export type PreventivoAlClienteUpsertWithWhereUniqueWithoutPreventivoInput = {
    where: PreventivoAlClienteWhereUniqueInput
    update: XOR<PreventivoAlClienteUpdateWithoutPreventivoInput, PreventivoAlClienteUncheckedUpdateWithoutPreventivoInput>
    create: XOR<PreventivoAlClienteCreateWithoutPreventivoInput, PreventivoAlClienteUncheckedCreateWithoutPreventivoInput>
  }

  export type PreventivoAlClienteUpdateWithWhereUniqueWithoutPreventivoInput = {
    where: PreventivoAlClienteWhereUniqueInput
    data: XOR<PreventivoAlClienteUpdateWithoutPreventivoInput, PreventivoAlClienteUncheckedUpdateWithoutPreventivoInput>
  }

  export type PreventivoAlClienteUpdateManyWithWhereWithoutPreventivoInput = {
    where: PreventivoAlClienteScalarWhereInput
    data: XOR<PreventivoAlClienteUpdateManyMutationInput, PreventivoAlClienteUncheckedUpdateManyWithoutPreventivoInput>
  }

  export type PreventivoAlClienteScalarWhereInput = {
    AND?: PreventivoAlClienteScalarWhereInput | PreventivoAlClienteScalarWhereInput[]
    OR?: PreventivoAlClienteScalarWhereInput[]
    NOT?: PreventivoAlClienteScalarWhereInput | PreventivoAlClienteScalarWhereInput[]
    id?: StringFilter<"PreventivoAlCliente"> | string
    id_preventivo?: StringNullableFilter<"PreventivoAlCliente"> | string | null
    descrizione_viaggio?: StringNullableFilter<"PreventivoAlCliente"> | string | null
  }

  export type PreventivoCreateWithoutServiziATerraInput = {
    id?: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    cliente: ClienteCreateNestedOneWithoutPreventiviInput
    voli?: VoloCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoUncheckedCreateWithoutServiziATerraInput = {
    id?: string
    id_cliente: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    voli?: VoloUncheckedCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneUncheckedCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoCreateOrConnectWithoutServiziATerraInput = {
    where: PreventivoWhereUniqueInput
    create: XOR<PreventivoCreateWithoutServiziATerraInput, PreventivoUncheckedCreateWithoutServiziATerraInput>
  }

  export type FornitoreCreateWithoutServiziATerraInput = {
    id?: string
    nome: string
    valuta?: string | null
    voli?: VoloCreateNestedManyWithoutFornitoreInput
    assicurazioni?: AssicurazioneCreateNestedManyWithoutFornitoreInput
  }

  export type FornitoreUncheckedCreateWithoutServiziATerraInput = {
    id?: string
    nome: string
    valuta?: string | null
    voli?: VoloUncheckedCreateNestedManyWithoutFornitoreInput
    assicurazioni?: AssicurazioneUncheckedCreateNestedManyWithoutFornitoreInput
  }

  export type FornitoreCreateOrConnectWithoutServiziATerraInput = {
    where: FornitoreWhereUniqueInput
    create: XOR<FornitoreCreateWithoutServiziATerraInput, FornitoreUncheckedCreateWithoutServiziATerraInput>
  }

  export type DestinazioneCreateWithoutServiziATerraInput = {
    id?: string
    nome: string
  }

  export type DestinazioneUncheckedCreateWithoutServiziATerraInput = {
    id?: string
    nome: string
  }

  export type DestinazioneCreateOrConnectWithoutServiziATerraInput = {
    where: DestinazioneWhereUniqueInput
    create: XOR<DestinazioneCreateWithoutServiziATerraInput, DestinazioneUncheckedCreateWithoutServiziATerraInput>
  }

  export type PreventivoUpsertWithoutServiziATerraInput = {
    update: XOR<PreventivoUpdateWithoutServiziATerraInput, PreventivoUncheckedUpdateWithoutServiziATerraInput>
    create: XOR<PreventivoCreateWithoutServiziATerraInput, PreventivoUncheckedCreateWithoutServiziATerraInput>
    where?: PreventivoWhereInput
  }

  export type PreventivoUpdateToOneWithWhereWithoutServiziATerraInput = {
    where?: PreventivoWhereInput
    data: XOR<PreventivoUpdateWithoutServiziATerraInput, PreventivoUncheckedUpdateWithoutServiziATerraInput>
  }

  export type PreventivoUpdateWithoutServiziATerraInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: ClienteUpdateOneRequiredWithoutPreventiviNestedInput
    voli?: VoloUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoUncheckedUpdateWithoutServiziATerraInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_cliente?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    voli?: VoloUncheckedUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUncheckedUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedUpdateManyWithoutPreventivoNestedInput
  }

  export type FornitoreUpsertWithoutServiziATerraInput = {
    update: XOR<FornitoreUpdateWithoutServiziATerraInput, FornitoreUncheckedUpdateWithoutServiziATerraInput>
    create: XOR<FornitoreCreateWithoutServiziATerraInput, FornitoreUncheckedCreateWithoutServiziATerraInput>
    where?: FornitoreWhereInput
  }

  export type FornitoreUpdateToOneWithWhereWithoutServiziATerraInput = {
    where?: FornitoreWhereInput
    data: XOR<FornitoreUpdateWithoutServiziATerraInput, FornitoreUncheckedUpdateWithoutServiziATerraInput>
  }

  export type FornitoreUpdateWithoutServiziATerraInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    voli?: VoloUpdateManyWithoutFornitoreNestedInput
    assicurazioni?: AssicurazioneUpdateManyWithoutFornitoreNestedInput
  }

  export type FornitoreUncheckedUpdateWithoutServiziATerraInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    voli?: VoloUncheckedUpdateManyWithoutFornitoreNestedInput
    assicurazioni?: AssicurazioneUncheckedUpdateManyWithoutFornitoreNestedInput
  }

  export type DestinazioneUpsertWithoutServiziATerraInput = {
    update: XOR<DestinazioneUpdateWithoutServiziATerraInput, DestinazioneUncheckedUpdateWithoutServiziATerraInput>
    create: XOR<DestinazioneCreateWithoutServiziATerraInput, DestinazioneUncheckedCreateWithoutServiziATerraInput>
    where?: DestinazioneWhereInput
  }

  export type DestinazioneUpdateToOneWithWhereWithoutServiziATerraInput = {
    where?: DestinazioneWhereInput
    data: XOR<DestinazioneUpdateWithoutServiziATerraInput, DestinazioneUncheckedUpdateWithoutServiziATerraInput>
  }

  export type DestinazioneUpdateWithoutServiziATerraInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type DestinazioneUncheckedUpdateWithoutServiziATerraInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type PreventivoCreateWithoutVoliInput = {
    id?: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    cliente: ClienteCreateNestedOneWithoutPreventiviInput
    serviziATerra?: ServiziATerraCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoUncheckedCreateWithoutVoliInput = {
    id?: string
    id_cliente: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneUncheckedCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoCreateOrConnectWithoutVoliInput = {
    where: PreventivoWhereUniqueInput
    create: XOR<PreventivoCreateWithoutVoliInput, PreventivoUncheckedCreateWithoutVoliInput>
  }

  export type FornitoreCreateWithoutVoliInput = {
    id?: string
    nome: string
    valuta?: string | null
    serviziATerra?: ServiziATerraCreateNestedManyWithoutFornitoreInput
    assicurazioni?: AssicurazioneCreateNestedManyWithoutFornitoreInput
  }

  export type FornitoreUncheckedCreateWithoutVoliInput = {
    id?: string
    nome: string
    valuta?: string | null
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutFornitoreInput
    assicurazioni?: AssicurazioneUncheckedCreateNestedManyWithoutFornitoreInput
  }

  export type FornitoreCreateOrConnectWithoutVoliInput = {
    where: FornitoreWhereUniqueInput
    create: XOR<FornitoreCreateWithoutVoliInput, FornitoreUncheckedCreateWithoutVoliInput>
  }

  export type PreventivoUpsertWithoutVoliInput = {
    update: XOR<PreventivoUpdateWithoutVoliInput, PreventivoUncheckedUpdateWithoutVoliInput>
    create: XOR<PreventivoCreateWithoutVoliInput, PreventivoUncheckedCreateWithoutVoliInput>
    where?: PreventivoWhereInput
  }

  export type PreventivoUpdateToOneWithWhereWithoutVoliInput = {
    where?: PreventivoWhereInput
    data: XOR<PreventivoUpdateWithoutVoliInput, PreventivoUncheckedUpdateWithoutVoliInput>
  }

  export type PreventivoUpdateWithoutVoliInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: ClienteUpdateOneRequiredWithoutPreventiviNestedInput
    serviziATerra?: ServiziATerraUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoUncheckedUpdateWithoutVoliInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_cliente?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUncheckedUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedUpdateManyWithoutPreventivoNestedInput
  }

  export type FornitoreUpsertWithoutVoliInput = {
    update: XOR<FornitoreUpdateWithoutVoliInput, FornitoreUncheckedUpdateWithoutVoliInput>
    create: XOR<FornitoreCreateWithoutVoliInput, FornitoreUncheckedCreateWithoutVoliInput>
    where?: FornitoreWhereInput
  }

  export type FornitoreUpdateToOneWithWhereWithoutVoliInput = {
    where?: FornitoreWhereInput
    data: XOR<FornitoreUpdateWithoutVoliInput, FornitoreUncheckedUpdateWithoutVoliInput>
  }

  export type FornitoreUpdateWithoutVoliInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUpdateManyWithoutFornitoreNestedInput
    assicurazioni?: AssicurazioneUpdateManyWithoutFornitoreNestedInput
  }

  export type FornitoreUncheckedUpdateWithoutVoliInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutFornitoreNestedInput
    assicurazioni?: AssicurazioneUncheckedUpdateManyWithoutFornitoreNestedInput
  }

  export type PreventivoCreateWithoutAssicurazioniInput = {
    id?: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    cliente: ClienteCreateNestedOneWithoutPreventiviInput
    serviziATerra?: ServiziATerraCreateNestedManyWithoutPreventivoInput
    voli?: VoloCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoUncheckedCreateWithoutAssicurazioniInput = {
    id?: string
    id_cliente: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutPreventivoInput
    voli?: VoloUncheckedCreateNestedManyWithoutPreventivoInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoCreateOrConnectWithoutAssicurazioniInput = {
    where: PreventivoWhereUniqueInput
    create: XOR<PreventivoCreateWithoutAssicurazioniInput, PreventivoUncheckedCreateWithoutAssicurazioniInput>
  }

  export type FornitoreCreateWithoutAssicurazioniInput = {
    id?: string
    nome: string
    valuta?: string | null
    serviziATerra?: ServiziATerraCreateNestedManyWithoutFornitoreInput
    voli?: VoloCreateNestedManyWithoutFornitoreInput
  }

  export type FornitoreUncheckedCreateWithoutAssicurazioniInput = {
    id?: string
    nome: string
    valuta?: string | null
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutFornitoreInput
    voli?: VoloUncheckedCreateNestedManyWithoutFornitoreInput
  }

  export type FornitoreCreateOrConnectWithoutAssicurazioniInput = {
    where: FornitoreWhereUniqueInput
    create: XOR<FornitoreCreateWithoutAssicurazioniInput, FornitoreUncheckedCreateWithoutAssicurazioniInput>
  }

  export type PreventivoUpsertWithoutAssicurazioniInput = {
    update: XOR<PreventivoUpdateWithoutAssicurazioniInput, PreventivoUncheckedUpdateWithoutAssicurazioniInput>
    create: XOR<PreventivoCreateWithoutAssicurazioniInput, PreventivoUncheckedCreateWithoutAssicurazioniInput>
    where?: PreventivoWhereInput
  }

  export type PreventivoUpdateToOneWithWhereWithoutAssicurazioniInput = {
    where?: PreventivoWhereInput
    data: XOR<PreventivoUpdateWithoutAssicurazioniInput, PreventivoUncheckedUpdateWithoutAssicurazioniInput>
  }

  export type PreventivoUpdateWithoutAssicurazioniInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: ClienteUpdateOneRequiredWithoutPreventiviNestedInput
    serviziATerra?: ServiziATerraUpdateManyWithoutPreventivoNestedInput
    voli?: VoloUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoUncheckedUpdateWithoutAssicurazioniInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_cliente?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutPreventivoNestedInput
    voli?: VoloUncheckedUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedUpdateManyWithoutPreventivoNestedInput
  }

  export type FornitoreUpsertWithoutAssicurazioniInput = {
    update: XOR<FornitoreUpdateWithoutAssicurazioniInput, FornitoreUncheckedUpdateWithoutAssicurazioniInput>
    create: XOR<FornitoreCreateWithoutAssicurazioniInput, FornitoreUncheckedCreateWithoutAssicurazioniInput>
    where?: FornitoreWhereInput
  }

  export type FornitoreUpdateToOneWithWhereWithoutAssicurazioniInput = {
    where?: FornitoreWhereInput
    data: XOR<FornitoreUpdateWithoutAssicurazioniInput, FornitoreUncheckedUpdateWithoutAssicurazioniInput>
  }

  export type FornitoreUpdateWithoutAssicurazioniInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUpdateManyWithoutFornitoreNestedInput
    voli?: VoloUpdateManyWithoutFornitoreNestedInput
  }

  export type FornitoreUncheckedUpdateWithoutAssicurazioniInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutFornitoreNestedInput
    voli?: VoloUncheckedUpdateManyWithoutFornitoreNestedInput
  }

  export type PreventivoCreateWithoutPreventiviAlClienteInput = {
    id?: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    cliente: ClienteCreateNestedOneWithoutPreventiviInput
    serviziATerra?: ServiziATerraCreateNestedManyWithoutPreventivoInput
    voli?: VoloCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoUncheckedCreateWithoutPreventiviAlClienteInput = {
    id?: string
    id_cliente: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
    serviziATerra?: ServiziATerraUncheckedCreateNestedManyWithoutPreventivoInput
    voli?: VoloUncheckedCreateNestedManyWithoutPreventivoInput
    assicurazioni?: AssicurazioneUncheckedCreateNestedManyWithoutPreventivoInput
  }

  export type PreventivoCreateOrConnectWithoutPreventiviAlClienteInput = {
    where: PreventivoWhereUniqueInput
    create: XOR<PreventivoCreateWithoutPreventiviAlClienteInput, PreventivoUncheckedCreateWithoutPreventiviAlClienteInput>
  }

  export type PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput = {
    id?: string
    senza_assicurazione?: boolean | null
    destinazione?: string | null
    descrizione?: string | null
    individuale?: number | null
    numero?: number | null
  }

  export type PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput = {
    id?: string
    senza_assicurazione?: boolean | null
    destinazione?: string | null
    descrizione?: string | null
    individuale?: number | null
    numero?: number | null
  }

  export type PreventivoAlClienteRowCreateOrConnectWithoutPreventivoAlClienteInput = {
    where: PreventivoAlClienteRowWhereUniqueInput
    create: XOR<PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput, PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput>
  }

  export type PreventivoAlClienteRowCreateManyPreventivoAlClienteInputEnvelope = {
    data: PreventivoAlClienteRowCreateManyPreventivoAlClienteInput | PreventivoAlClienteRowCreateManyPreventivoAlClienteInput[]
  }

  export type PreventivoUpsertWithoutPreventiviAlClienteInput = {
    update: XOR<PreventivoUpdateWithoutPreventiviAlClienteInput, PreventivoUncheckedUpdateWithoutPreventiviAlClienteInput>
    create: XOR<PreventivoCreateWithoutPreventiviAlClienteInput, PreventivoUncheckedCreateWithoutPreventiviAlClienteInput>
    where?: PreventivoWhereInput
  }

  export type PreventivoUpdateToOneWithWhereWithoutPreventiviAlClienteInput = {
    where?: PreventivoWhereInput
    data: XOR<PreventivoUpdateWithoutPreventiviAlClienteInput, PreventivoUncheckedUpdateWithoutPreventiviAlClienteInput>
  }

  export type PreventivoUpdateWithoutPreventiviAlClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    cliente?: ClienteUpdateOneRequiredWithoutPreventiviNestedInput
    serviziATerra?: ServiziATerraUpdateManyWithoutPreventivoNestedInput
    voli?: VoloUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoUncheckedUpdateWithoutPreventiviAlClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_cliente?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutPreventivoNestedInput
    voli?: VoloUncheckedUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUncheckedUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoAlClienteRowUpsertWithWhereUniqueWithoutPreventivoAlClienteInput = {
    where: PreventivoAlClienteRowWhereUniqueInput
    update: XOR<PreventivoAlClienteRowUpdateWithoutPreventivoAlClienteInput, PreventivoAlClienteRowUncheckedUpdateWithoutPreventivoAlClienteInput>
    create: XOR<PreventivoAlClienteRowCreateWithoutPreventivoAlClienteInput, PreventivoAlClienteRowUncheckedCreateWithoutPreventivoAlClienteInput>
  }

  export type PreventivoAlClienteRowUpdateWithWhereUniqueWithoutPreventivoAlClienteInput = {
    where: PreventivoAlClienteRowWhereUniqueInput
    data: XOR<PreventivoAlClienteRowUpdateWithoutPreventivoAlClienteInput, PreventivoAlClienteRowUncheckedUpdateWithoutPreventivoAlClienteInput>
  }

  export type PreventivoAlClienteRowUpdateManyWithWhereWithoutPreventivoAlClienteInput = {
    where: PreventivoAlClienteRowScalarWhereInput
    data: XOR<PreventivoAlClienteRowUpdateManyMutationInput, PreventivoAlClienteRowUncheckedUpdateManyWithoutPreventivoAlClienteInput>
  }

  export type PreventivoAlClienteRowScalarWhereInput = {
    AND?: PreventivoAlClienteRowScalarWhereInput | PreventivoAlClienteRowScalarWhereInput[]
    OR?: PreventivoAlClienteRowScalarWhereInput[]
    NOT?: PreventivoAlClienteRowScalarWhereInput | PreventivoAlClienteRowScalarWhereInput[]
    id?: StringFilter<"PreventivoAlClienteRow"> | string
    id_preventivo_al_cliente?: StringFilter<"PreventivoAlClienteRow"> | string
    senza_assicurazione?: BoolNullableFilter<"PreventivoAlClienteRow"> | boolean | null
    destinazione?: StringNullableFilter<"PreventivoAlClienteRow"> | string | null
    descrizione?: StringNullableFilter<"PreventivoAlClienteRow"> | string | null
    individuale?: FloatNullableFilter<"PreventivoAlClienteRow"> | number | null
    numero?: IntNullableFilter<"PreventivoAlClienteRow"> | number | null
  }

  export type PreventivoAlClienteCreateWithoutRowsInput = {
    id?: string
    descrizione_viaggio?: string | null
    preventivo?: PreventivoCreateNestedOneWithoutPreventiviAlClienteInput
  }

  export type PreventivoAlClienteUncheckedCreateWithoutRowsInput = {
    id?: string
    id_preventivo?: string | null
    descrizione_viaggio?: string | null
  }

  export type PreventivoAlClienteCreateOrConnectWithoutRowsInput = {
    where: PreventivoAlClienteWhereUniqueInput
    create: XOR<PreventivoAlClienteCreateWithoutRowsInput, PreventivoAlClienteUncheckedCreateWithoutRowsInput>
  }

  export type PreventivoAlClienteUpsertWithoutRowsInput = {
    update: XOR<PreventivoAlClienteUpdateWithoutRowsInput, PreventivoAlClienteUncheckedUpdateWithoutRowsInput>
    create: XOR<PreventivoAlClienteCreateWithoutRowsInput, PreventivoAlClienteUncheckedCreateWithoutRowsInput>
    where?: PreventivoAlClienteWhereInput
  }

  export type PreventivoAlClienteUpdateToOneWithWhereWithoutRowsInput = {
    where?: PreventivoAlClienteWhereInput
    data: XOR<PreventivoAlClienteUpdateWithoutRowsInput, PreventivoAlClienteUncheckedUpdateWithoutRowsInput>
  }

  export type PreventivoAlClienteUpdateWithoutRowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    preventivo?: PreventivoUpdateOneWithoutPreventiviAlClienteNestedInput
  }

  export type PreventivoAlClienteUncheckedUpdateWithoutRowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiziATerraCreateManyDestinazioneInput = {
    id?: string
    id_preventivo: string
    id_fornitore?: string | null
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  export type ServiziATerraUpdateWithoutDestinazioneInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preventivo?: PreventivoUpdateOneRequiredWithoutServiziATerraNestedInput
    fornitore?: FornitoreUpdateOneWithoutServiziATerraNestedInput
  }

  export type ServiziATerraUncheckedUpdateWithoutDestinazioneInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ServiziATerraUncheckedUpdateManyWithoutDestinazioneInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type PreventivoCreateManyClienteInput = {
    id?: string
    percentuale_ricarico?: number | null
    note?: string | null
    brand?: string | null
    adulti?: number | null
    bambini?: number | null
    destinazione?: string | null
    tipo_viaggio?: string | null
    note_operative?: string | null
    riferimento?: string | null
    data_partenza?: Date | string | null
    operatore?: string | null
    feedback?: string | null
    stato?: string | null
    data?: Date | string
    numero_preventivo?: string | null
  }

  export type PreventivoUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUpdateManyWithoutPreventivoNestedInput
    voli?: VoloUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
    serviziATerra?: ServiziATerraUncheckedUpdateManyWithoutPreventivoNestedInput
    voli?: VoloUncheckedUpdateManyWithoutPreventivoNestedInput
    assicurazioni?: AssicurazioneUncheckedUpdateManyWithoutPreventivoNestedInput
    preventiviAlCliente?: PreventivoAlClienteUncheckedUpdateManyWithoutPreventivoNestedInput
  }

  export type PreventivoUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentuale_ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    adulti?: NullableIntFieldUpdateOperationsInput | number | null
    bambini?: NullableIntFieldUpdateOperationsInput | number | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    note_operative?: NullableStringFieldUpdateOperationsInput | string | null
    riferimento?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    operatore?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    stato?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_preventivo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiziATerraCreateManyFornitoreInput = {
    id?: string
    id_preventivo: string
    id_destinazione?: string | null
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  export type VoloCreateManyFornitoreInput = {
    id?: string
    id_preventivo: string
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
  }

  export type AssicurazioneCreateManyFornitoreInput = {
    id?: string
    id_preventivo: string
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
  }

  export type ServiziATerraUpdateWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    preventivo?: PreventivoUpdateOneRequiredWithoutServiziATerraNestedInput
    destinazione?: DestinazioneUpdateOneWithoutServiziATerraNestedInput
  }

  export type ServiziATerraUncheckedUpdateWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ServiziATerraUncheckedUpdateManyWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    id_destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type VoloUpdateWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    preventivo?: PreventivoUpdateOneRequiredWithoutVoliNestedInput
  }

  export type VoloUncheckedUpdateWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type VoloUncheckedUpdateManyWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AssicurazioneUpdateWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    preventivo?: PreventivoUpdateOneRequiredWithoutAssicurazioniNestedInput
  }

  export type AssicurazioneUncheckedUpdateWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssicurazioneUncheckedUpdateManyWithoutFornitoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_preventivo?: StringFieldUpdateOperationsInput | string
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ServiziATerraCreateManyPreventivoInput = {
    id?: string
    id_fornitore?: string | null
    id_destinazione?: string | null
    descrizione?: string | null
    data?: Date | string | null
    numero_notti?: number | null
    numero_camere?: number | null
    totale?: number | null
    valuta?: string | null
    cambio?: number | null
    servizio_aggiuntivo?: boolean | null
  }

  export type VoloCreateManyPreventivoInput = {
    id?: string
    id_fornitore?: string | null
    compagnia_aerea?: string | null
    descrizione?: string | null
    data_partenza?: Date | string | null
    data_arrivo?: Date | string | null
    totale?: number | null
    ricarico?: number | null
    numero?: number | null
    valuta?: string | null
    cambio?: number | null
  }

  export type AssicurazioneCreateManyPreventivoInput = {
    id?: string
    id_fornitore?: string | null
    assicurazione?: string | null
    netto?: number | null
    ricarico?: number | null
    numero?: number | null
  }

  export type PreventivoAlClienteCreateManyPreventivoInput = {
    id?: string
    descrizione_viaggio?: string | null
  }

  export type ServiziATerraUpdateWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    fornitore?: FornitoreUpdateOneWithoutServiziATerraNestedInput
    destinazione?: DestinazioneUpdateOneWithoutServiziATerraNestedInput
  }

  export type ServiziATerraUncheckedUpdateWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    id_destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ServiziATerraUncheckedUpdateManyWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    id_destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numero_notti?: NullableIntFieldUpdateOperationsInput | number | null
    numero_camere?: NullableIntFieldUpdateOperationsInput | number | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    servizio_aggiuntivo?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type VoloUpdateWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
    fornitore?: FornitoreUpdateOneWithoutVoliNestedInput
  }

  export type VoloUncheckedUpdateWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type VoloUncheckedUpdateManyWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    compagnia_aerea?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    data_partenza?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data_arrivo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totale?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    valuta?: NullableStringFieldUpdateOperationsInput | string | null
    cambio?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AssicurazioneUpdateWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
    fornitore?: FornitoreUpdateOneWithoutAssicurazioniNestedInput
  }

  export type AssicurazioneUncheckedUpdateWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssicurazioneUncheckedUpdateManyWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_fornitore?: NullableStringFieldUpdateOperationsInput | string | null
    assicurazione?: NullableStringFieldUpdateOperationsInput | string | null
    netto?: NullableFloatFieldUpdateOperationsInput | number | null
    ricarico?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PreventivoAlClienteUpdateWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    rows?: PreventivoAlClienteRowUpdateManyWithoutPreventivoAlClienteNestedInput
  }

  export type PreventivoAlClienteUncheckedUpdateWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
    rows?: PreventivoAlClienteRowUncheckedUpdateManyWithoutPreventivoAlClienteNestedInput
  }

  export type PreventivoAlClienteUncheckedUpdateManyWithoutPreventivoInput = {
    id?: StringFieldUpdateOperationsInput | string
    descrizione_viaggio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PreventivoAlClienteRowCreateManyPreventivoAlClienteInput = {
    id?: string
    senza_assicurazione?: boolean | null
    destinazione?: string | null
    descrizione?: string | null
    individuale?: number | null
    numero?: number | null
  }

  export type PreventivoAlClienteRowUpdateWithoutPreventivoAlClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    senza_assicurazione?: NullableBoolFieldUpdateOperationsInput | boolean | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    individuale?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PreventivoAlClienteRowUncheckedUpdateWithoutPreventivoAlClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    senza_assicurazione?: NullableBoolFieldUpdateOperationsInput | boolean | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    individuale?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PreventivoAlClienteRowUncheckedUpdateManyWithoutPreventivoAlClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    senza_assicurazione?: NullableBoolFieldUpdateOperationsInput | boolean | null
    destinazione?: NullableStringFieldUpdateOperationsInput | string | null
    descrizione?: NullableStringFieldUpdateOperationsInput | string | null
    individuale?: NullableFloatFieldUpdateOperationsInput | number | null
    numero?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
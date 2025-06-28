export interface PersistFlagOptions {
  namespace?: string;
  disableQuery?: string;
  storage?: 'local' | 'session';
}

type FlagHandler = (value: string) => void;

export default class PersistFlag {
  private readonly ns: string;
  private readonly disabled: boolean;
  private readonly store: Storage;

  constructor({
    namespace = 'pf',
    disableQuery = 'test',
    storage = 'local',
  }: PersistFlagOptions = {}) {
    this.ns = namespace;
    this.disabled = new URLSearchParams(window.location.search).has(disableQuery);
    this.store = storage === 'session' ? window.sessionStorage : window.localStorage;
  }

  private isValidKey(flag: string | undefined | null): flag is string {
    return typeof flag === 'string' && flag.trim().length > 0;
  }

  private key(flag: string): string {
    return `${this.ns}:${flag}`;
  }

  private exec<T>(fn: () => T, fallback?: T): T {
    if (this.disabled) return fallback as T;

    try {
      return fn();
    } catch {
      return fallback as T;
    }
  }

  public set(flag: string, value = '1'): void {
    if (!this.isValidKey(flag)) return;

    this.exec(() => this.store.setItem(this.key(flag), value));
  }

  public get(flag: string): string | null {
    if (!this.isValidKey(flag)) return null;

    return this.exec(() => this.store.getItem(this.key(flag)), null);
  }

  public has(flag: string): boolean {
    return this.get(flag) !== null;
  }

  public on(flag: string, cb: FlagHandler): boolean {
    const value = this.get(flag);
    const exists = value !== null;

    if (exists && cb) cb(value);

    return exists;
  }

  public reset(flag?: string): void {
    if (this.disabled) return;

    if (this.isValidKey(flag)) {
      this.exec(() => this.store.removeItem(this.key(flag)));

      return;
    }

    const keysToRemove = Object.keys(this.store).filter((k) => k.startsWith(`${this.ns}:`));

    keysToRemove.forEach((k) => this.exec(() => this.store.removeItem(k)));
  }

  public init(map?: Record<string, FlagHandler | boolean>): this {
    if (!map || this.disabled) return this;

    Object.entries(map).forEach(([flag, handler]) => {
      if (!this.isValidKey(flag)) return;

      if (handler === true) {
        this.has(flag);
      } else {
        this.on(flag, handler as FlagHandler);
      }
    });

    return this;
  }
}

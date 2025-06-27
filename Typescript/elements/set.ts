export class Conjunto<T> {
    private items: { [key: string]: T };
    constructor() {
        this.items = Object.create(null);
    }
    has(element: T): boolean {
        return Object.prototype.hasOwnProperty.call(this.items, String(element));
    }
    clear(): void {
        this.items = Object.create(null);
    }
    values(): T[] {
        return Object.values(this.items);
    }
    size(): number {
        return Object.values(this.items).length;
    }
    isEmpty(): boolean {
        return this.size() === 0;
    }
    print(): void {
        if (this.isEmpty()) {
            console.log("Conjunto vazio");
            return;
        }
        console.log(Object.keys(this.items));
    }
    add(element: T): boolean {
        if (!this.has(element)) {
            this.items[String(element)] = element;
            return true;
        }
        return false;
    }
    delete(element: T): boolean {
        if (this.has(element)) {
            delete this.items[String(element)];
            return true;
        }
        return false;
    }
    get(element: T): T | undefined {
        let respost: T | undefined = undefined;
        if (this.has(element)) {
            respost = this.items[String(element)];
            this.delete(element);
        }
        return respost;
    }
    union(otherSet: Conjunto<T>): Conjunto<T> {
        const unionSet = new Conjunto<T>();
        this.values().forEach(item => unionSet.add(item));
        otherSet.values().forEach(item => unionSet.add(item));
        return unionSet;
    }
    intersection(otherSet: Conjunto<T>): Conjunto<T> {
        const intersectionSet = new Conjunto<T>();
        this.values().forEach(item => {
            if (otherSet.has(item)) {
                intersectionSet.add(item);
            }
        });
        return intersectionSet;
    }
    difference(otherSet: Conjunto<T>): Conjunto<T> {
        const differenceSet = new Conjunto<T>();
        this.values().forEach(item => {
            if (!otherSet.has(item)) {
                differenceSet.add(item);
            }
        });
        return differenceSet;
    }
    isSubsetOf(otherSet: Conjunto<T>): boolean {
        if (this.size() > otherSet.size()) return false;
        return this.values().every(item => otherSet.has(item));
    }
    isSupersetOf(otherSet: Conjunto<T>): boolean {
        if (this.size() < otherSet.size()) return false;
        return otherSet.values().every(item => this.has(item));
    }
}
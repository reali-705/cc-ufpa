export class MyArray<T> {
    private items: Array<T>;
    private count: number;
    private capacity: number;
    private multiplier: number = 1.5;
    constructor(count = 0){
        if (count < 0) count = 0;
        this.count = count;
        this.capacity = Math.floor(this.count * this.multiplier) || 1;
        this.items = new Array(this.capacity);
        for (let i = 0; i < count; i++) {
            this.items[i] = undefined as T;
        }
    }
    print(): void {
        for (let i = 0; i < this.count; i++) {
            console.log(this.items[i]);
        }
    }
    insert(item: T): void  {
        if (this.capacity === this.count) {
            let newCapacity = Math.floor(this.capacity * this.multiplier);
            if (newCapacity == this.capacity) newCapacity++;
            const newItems = new Array(newCapacity);
            this.items.forEach((item, index) => { newItems[index] = item });
            this.items = newItems;
            this.capacity = newCapacity;
        }
        this.items[this.count++] = item;
    }
    verifyIndex(index: number): boolean {
        if (index < 0 || index >= this.count) {
            return false;
        }
        return true;
    }
    put(index: number, item: T): boolean{
        if (!this.verifyIndex(index)) {
            return false;
        }
        this.items[index] = item;
        return true;
    }
    removeAt(index: number): boolean {
        if (!this.verifyIndex(index)) {
            return false;
        }
        for (let i = index; i < this.count - 1; i++) {
            this.items[i] = this.items[i + 1];
        }
        this.count--;
        this.items[this.count] = undefined as T;
        return true;
    }
    indexOf(item: T): number {
        for (let i = 0; i < this.count; i++) {
            if (this.items[i] === item) {
                return i;
            }
        }
        return -1;
    }
    get(index: number): T | undefined {
        if (this.verifyIndex(index)) {
            return this.items[index];
        }
    }
}
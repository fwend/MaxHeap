class MaxHeap {
  
    constructor(capacity, compare) {
        this.tree = Array(capacity);
        this.size = 0;
        this.capacity = capacity;
        this.compare = compare;
    }

    parent(i) {
        return Math.floor((i - 1) / 2);
    }
    
    left(i) {
        return 2 * i + 1;
    }
    
    right(i) {
        return 2 * i + 2;
    }    

    insertKey(k) { 
        this.size++;
        
        if (this.size >= this.capacity) { 
            this.tree = this.tree.concat(Array(this.capacity));
            this.capacity = this.tree.length;
        } 
        
        this.tree[this.size - 1] = Number.NEGATIVE_INFINITY;
        this.increaseKey(this.size - 1, k);
    } 
  
    maxHeapify(i) {

        const l = 2 * i + 1; 
        const r = 2 * i + 2; 

        let largest = i; 

        if (l < this.size && this.compare(this.tree[l] , this.tree[largest])) { 
            largest = l; 
        }

        if (r < this.size && this.compare(this.tree[r] , this.tree[largest])) { 
            largest = r; 
        }

        if (largest != i) 
        { 
            this.swap(i, largest); 
            this.maxHeapify(largest); 
        } 
    }  
  
    extractMax() { 
        if (this.size > 0) {
            const max = this.tree[0];
            this.tree[0] = this.tree[this.size - 1];
            this.size--;
            this.maxHeapify(0);
            return max;
        } else throw "tree is empty";
    }   
    
    increaseKey(i, key) {
        this.tree[i] = key;
        while (i > 0 && this.compare(this.tree[i], this.tree[this.parent(i)])) { 
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
  
    getMax() { 
        if (this.size > 0) {
            return this.tree[0];
        } else throw "tree is empty";
    } 
    
    getNode(i) {
        if (i < this.size) {
            return this.tree[i];
        } else throw "index out of bounds";
    }

    swap(i, j) {
        const tmp = this.tree[i];
        this.tree[i] = this.tree[j];
        this.tree[j] = tmp;    
    }
  
    display() {
        console.log(this.tree.slice(0, this.size));
    }
}

const arr = [1,2,3,4,5,6,7,8,9];

const maxHeap = new MaxHeap(arr.length);

for (const v of arr) {
    maxHeap.insertKey(v);
}

maxHeap.display();
maxHeap.insertKey(20);
maxHeap.display();
console.log(maxHeap.extractMax());
maxHeap.display();
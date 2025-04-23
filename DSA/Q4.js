// - **Linked List Cycle (#141)**
    
//     https://leetcode.com/problems/linked-list-cycle/


--- NOT COMPLETED ---



----HELP----


let curr = head;
let Next = head;

while(curr!=null && Next!=null &&  Next.next!=null){
    curr = curr.next;
    Next = Next.next.next;
    if(curr==Next){
        return true
    }
}

return false
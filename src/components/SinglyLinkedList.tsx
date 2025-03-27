
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  value: number;
  id: number;
}

const SinglyLinkedList = () => {
  const [list, setList] = useState<Node[]>([]);
  const [insertValue, setInsertValue] = useState("");
  const [insertAtValue, setInsertAtValue] = useState("");
  const [insertAtPos, setInsertAtPos] = useState("");
  const [deletePos, setDeletePos] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const addNode = () => {
    if (!insertValue) {
      toast({ title: "Error", description: "Please enter a value", variant: "destructive" });
      return;
    }
    const newNode = { value: parseInt(insertValue), id: Date.now() };
    setList([...list, newNode]);
    setInsertValue("");
    toast({ title: "Success", description: "Node added successfully" });
  };

  const insertAt = () => {
    const pos = parseInt(insertAtPos);
    if (!insertAtValue || isNaN(pos) || pos < 0 || pos > list.length) {
      toast({ title: "Error", description: "Invalid position or value", variant: "destructive" });
      return;
    }
    const newNode = { value: parseInt(insertAtValue), id: Date.now() };
    const newList = [...list];
    newList.splice(pos, 0, newNode);
    setList(newList);
    setInsertAtValue("");
    setInsertAtPos("");
    toast({ title: "Success", description: "Node inserted successfully" });
  };

  const deleteAt = () => {
    const pos = parseInt(deletePos);
    if (isNaN(pos) || pos < 0 || pos >= list.length) {
      toast({ title: "Error", description: "Invalid position", variant: "destructive" });
      return;
    }
    const newList = [...list];
    newList.splice(pos, 1);
    setList(newList);
    setDeletePos("");
    toast({ title: "Success", description: "Node deleted successfully" });
  };

  const search = () => {
    if (!searchValue) {
      toast({ title: "Error", description: "Please enter a search value", variant: "destructive" });
      return;
    }
    const value = parseInt(searchValue);
    const index = list.findIndex(node => node.value === value);
    if (index === -1) {
      toast({ title: "Not Found", description: "Value not found in list", variant: "destructive" });
    } else {
      setHighlightedIndex(index);
      setTimeout(() => setHighlightedIndex(null), 2000);
      toast({ title: "Found", description: `Value found at position ${index}` });
    }
    setSearchValue("");
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600">Danh Sách Liên Kết Đơn</h2>
      
      <div className="grid gap-4">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Giá trị"
            value={insertValue}
            onChange={(e) => setInsertValue(e.target.value)}
          />
          <Button onClick={addNode}>Thêm</Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Giá trị"
            value={insertAtValue}
            onChange={(e) => setInsertAtValue(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Vị trí"
            value={insertAtPos}
            onChange={(e) => setInsertAtPos(e.target.value)}
          />
          <Button onClick={insertAt}>Chèn vào vị trí</Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Vị trí"
            value={deletePos}
            onChange={(e) => setDeletePos(e.target.value)}
          />
          <Button variant="destructive" onClick={deleteAt}>Xóa</Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Tìm giá trị"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button variant="secondary" onClick={search}>Tìm</Button>
        </div>
      </div>

      <div className="overflow-x-auto py-8">
        <AnimatePresence>
          <div className="flex items-center justify-start min-h-[100px] gap-2">
            {list.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  backgroundColor: highlightedIndex === index ? "#fef08a" : "#fff"
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center"
              >
                <div className="w-12 h-12 flex items-center justify-center border-2 border-blue-500 rounded-lg bg-white">
                  {node.value}
                </div>
                {index < list.length - 1 && (
                  <ArrowRight className="text-blue-500 mx-1" />
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <div className="text-center text-gray-600">
        {list.length === 0 ? "Danh sách: Trống" : `Số phần tử: ${list.length}`}
      </div>
    </div>
  );
};

export default SinglyLinkedList;

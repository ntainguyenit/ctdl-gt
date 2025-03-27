
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface StackItem {
  value: number;
  id: number;
}

const Stack = () => {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [pushValue, setPushValue] = useState("");
  const { toast } = useToast();

  const push = () => {
    if (!pushValue) {
      toast({ title: "Error", description: "Please enter a value", variant: "destructive" });
      return;
    }
    const newItem = { value: parseInt(pushValue), id: Date.now() };
    setStack([newItem, ...stack]);
    setPushValue("");
    toast({ title: "Success", description: "Item pushed to stack" });
  };

  const pop = () => {
    if (stack.length === 0) {
      toast({ title: "Error", description: "Stack is empty", variant: "destructive" });
      return;
    }
    const newStack = [...stack];
    const popped = newStack.shift();
    setStack(newStack);
    toast({ title: "Success", description: `Popped value: ${popped?.value}` });
  };

  const peek = () => {
    if (stack.length === 0) {
      toast({ title: "Error", description: "Stack is empty", variant: "destructive" });
      return;
    }
    toast({ title: "Top Value", description: `Current top value: ${stack[0].value}` });
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-orange-500">Ngăn Xếp (LIFO)</h2>
      
      <div className="grid gap-4">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Giá trị"
            value={pushValue}
            onChange={(e) => setPushValue(e.target.value)}
          />
          <Button onClick={push} className="bg-orange-500 hover:bg-orange-600">
            Push (Thêm)
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={pop}
            className="flex-1"
          >
            Pop (Lấy ra)
          </Button>
          <Button
            variant="secondary"
            onClick={peek}
            className="flex-1"
          >
            Peek (Xem đỉnh)
          </Button>
        </div>
      </div>

      <div className="flex justify-center py-8">
        <AnimatePresence>
          <div className="flex flex-col-reverse gap-2">
            {stack.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className={`w-32 h-12 flex items-center justify-center border-2 
                  ${index === 0 ? "border-orange-500 bg-orange-50" : "border-orange-300 bg-white"}
                  rounded-lg`}
              >
                {item.value}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <div className="text-center text-gray-600">
        {stack.length === 0 ? "Ngăn xếp: Trống" : `Số phần tử: ${stack.length}`}
      </div>
    </div>
  );
};

export default Stack;

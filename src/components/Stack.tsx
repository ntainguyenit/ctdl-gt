
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
      toast({ title: "Lỗi", description: "Vui lòng nhập giá trị", variant: "destructive" });
      return;
    }
    const newItem = { value: parseInt(pushValue), id: Date.now() };
    setStack([...stack, newItem]);
    setPushValue("");
    toast({ title: "Thành công", description: "Đã thêm phần tử vào ngăn xếp" });
  };

  const pop = () => {
    if (stack.length === 0) {
      toast({ title: "Lỗi", description: "Ngăn xếp đang trống", variant: "destructive" });
      return;
    }
    const newStack = [...stack];
    const popped = newStack.pop();
    setStack(newStack);
    toast({ title: "Thành công", description: `Đã lấy ra giá trị: ${popped?.value}` });
  };

  const peek = () => {
    if (stack.length === 0) {
      toast({ title: "Lỗi", description: "Ngăn xếp đang trống", variant: "destructive" });
      return;
    }
    toast({ title: "Giá Trị Đỉnh", description: `Giá trị đỉnh hiện tại: ${stack[stack.length - 1].value}` });
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
          <div className="flex flex-col gap-2">
            {stack.slice().reverse().map((item, reversedIndex) => {
              const index = stack.length - 1 - reversedIndex;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`w-32 h-12 flex items-center justify-center border-2 
                    ${index === stack.length - 1 ? "border-orange-500 bg-orange-50" : "border-orange-300 bg-white"}
                    rounded-lg`}
                >
                  {item.value}
                </motion.div>
              );
            })}
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

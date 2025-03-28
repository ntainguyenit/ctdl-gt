
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface QueueItem {
  value: number;
  id: number;
}

const Queue = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [enqueueValue, setEnqueueValue] = useState("");
  const { toast } = useToast();

  const enqueue = () => {
    if (!enqueueValue) {
      toast({ title: "Lỗi", description: "Vui lòng nhập giá trị", variant: "destructive" });
      return;
    }
    const newItem = { value: parseInt(enqueueValue), id: Date.now() };
    setQueue([...queue, newItem]);
    setEnqueueValue("");
    toast({ title: "Thành công", description: "Đã thêm phần tử vào hàng đợi" });
  };

  const dequeue = () => {
    if (queue.length === 0) {
      toast({ title: "Lỗi", description: "Hàng đợi đang trống", variant: "destructive" });
      return;
    }
    const newQueue = [...queue];
    const dequeued = newQueue.shift();
    setQueue(newQueue);
    toast({ title: "Thành công", description: `Đã lấy ra giá trị: ${dequeued?.value}` });
  };

  const front = () => {
    if (queue.length === 0) {
      toast({ title: "Lỗi", description: "Hàng đợi đang trống", variant: "destructive" });
      return;
    }
    toast({ title: "Giá Trị Đầu", description: `Giá trị đầu hiện tại: ${queue[0].value}` });
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-purple-500">Hàng Đợi (FIFO)</h2>
      
      <div className="grid gap-4">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Giá trị"
            value={enqueueValue}
            onChange={(e) => setEnqueueValue(e.target.value)}
          />
          <Button onClick={enqueue} className="bg-purple-500 hover:bg-purple-600">
            Enqueue (Thêm)
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={dequeue}
            className="flex-1"
          >
            Dequeue (Lấy ra)
          </Button>
          <Button
            variant="secondary"
            onClick={front}
            className="flex-1"
          >
            Front (Xem đầu)
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto py-8">
        <AnimatePresence>
          <div className="flex items-center justify-start min-h-[100px] gap-2">
            {queue.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center"
              >
                <div className={`w-12 h-12 flex items-center justify-center border-2 
                  ${index === 0 ? "border-purple-500 bg-purple-50" : "border-purple-300 bg-white"}
                  rounded-lg`}
                >
                  {item.value}
                </div>
                {index < queue.length - 1 && (
                  <ArrowLeft className="text-purple-500 mx-1" />
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <div className="text-center text-gray-600">
        {queue.length === 0 ? "Hàng đợi: Trống" : `Số phần tử: ${queue.length}`}
      </div>
    </div>
  );
};

export default Queue;

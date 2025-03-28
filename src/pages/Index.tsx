
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SinglyLinkedList from "@/components/SinglyLinkedList";
import DoublyLinkedList from "@/components/DoublyLinkedList";
import Stack from "@/components/Stack";
import Queue from "@/components/Queue";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Cấu trúc dữ liệu và Giải thuật</h1>
        <p className="text-gray-200 mb-2">Nhóm 2</p>
        <div className="text-gray-300 text-sm">
          <p>Thành Viên: Nguyễn Ngọc Thành Tài - Hồ Phước Thành - Trần Đình Lãm - Lê Trọng Nhật Long</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <Tabs defaultValue="singly-linked-list" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger 
              value="singly-linked-list" 
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all hover:bg-blue-400 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              Singly Linked List
            </TabsTrigger>
            <TabsTrigger 
              value="doubly-linked-list" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all hover:bg-blue-500 hover:text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            >
              Doubly Linked List
            </TabsTrigger>
            <TabsTrigger 
              value="stack" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all hover:bg-orange-400 hover:text-white hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            >
              Stack
            </TabsTrigger>
            <TabsTrigger 
              value="queue" 
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white transition-all hover:bg-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
              Queue
            </TabsTrigger>
          </TabsList>

          <TabsContent value="singly-linked-list">
            <SinglyLinkedList />
          </TabsContent>
          <TabsContent value="doubly-linked-list">
            <DoublyLinkedList />
          </TabsContent>
          <TabsContent value="stack">
            <Stack />
          </TabsContent>
          <TabsContent value="queue">
            <Queue />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

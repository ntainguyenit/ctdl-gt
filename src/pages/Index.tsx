
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SinglyLinkedList from "@/components/SinglyLinkedList";
import DoublyLinkedList from "@/components/DoublyLinkedList";
import Stack from "@/components/Stack";
import Queue from "@/components/Queue";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Data Structure Visualization</h1>
        <p className="text-gray-600">Learn and visualize fundamental data structures with interactive animations</p>
      </header>

      <main className="max-w-5xl mx-auto">
        <Tabs defaultValue="singly-linked-list" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="singly-linked-list" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Singly Linked List
            </TabsTrigger>
            <TabsTrigger value="doubly-linked-list" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Doubly Linked List
            </TabsTrigger>
            <TabsTrigger value="stack" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Stack
            </TabsTrigger>
            <TabsTrigger value="queue" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
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

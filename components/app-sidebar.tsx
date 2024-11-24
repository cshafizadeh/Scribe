import * as React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { LogOut, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { CardWithForm } from '@/components/createNotebook';
import { RenameNotebookModal } from '@/components/RenameNotebookModal';
import { createClient } from '@/utils/supabase/client';

export function AppSidebar({
  notebooks = [],
  onNewNotebook,
  onSelectNotebook,
  onRenameNotebook,
  onDeleteNotebook,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  notebooks: Array<{ id: string; title: string }>;
  onNewNotebook: () => void;
  onSelectNotebook: (notebook: { id: string; title: string }) => void;
  onRenameNotebook: (id: string, newTitle: string) => void;
  onDeleteNotebook: (id: string) => void; // New prop for delete function
}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const [editingNotebookId, setEditingNotebookId] = React.useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = React.useState('');

  const handleNewNotebook = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addNotebook = async (title: string) => {
    console.log('Creating notebook with title:', title);
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Error fetching user:', userError || 'No user logged in');
      alert('You must be logged in to create a notebook.');
      return;
    }

    const { error } = await supabase
      .from('notebooks')
      .insert([{ title, user_id: user.id }]);

    if (error) {
      console.error('Error creating notebook:', error);
      alert('Failed to create notebook.');
      return;
    }

    onNewNotebook(); // Refresh the notebook list
    closeModal(); // Close the modal
  };

  const handleRename = (id: string, title: string) => {
    setEditingNotebookId(id); // Start editing mode for the selected notebook
    setCurrentTitle(title); // Pre-fill the modal with the current title
    setIsRenameModalOpen(true); // Open the rename modal
  };

  const handleRenameSubmit = async (newTitle: string) => {
    if (editingNotebookId && newTitle.trim() !== '') {
      await onRenameNotebook(editingNotebookId, newTitle.trim());
      setEditingNotebookId(null); // Exit editing mode
      setIsRenameModalOpen(false); // Close the rename modal
    }
  };

  const handleDeleteNotebook = async () => {
    if (editingNotebookId) {
      await onDeleteNotebook(editingNotebookId);
      setEditingNotebookId(null); // Exit editing mode
      setIsRenameModalOpen(false); // Close the rename modal
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out.');
      return;
    }

    window.location.href = '/';
  };

  return (
    <>
      <Sidebar {...props}>
      <SidebarHeader>
          <h2 className="text-lg font-semibold items-center justify-between">
            My Notebooks
          </h2>
          <Button
            onClick={handleNewNotebook}
            className="bg-[#D73F09] text-white px-3 my-3 rounded-lg hover:bg-[#B53008] flex items-center gap-2 transition-all duration-200"
          >
            <FilePlus className="w-5 h-5 text-white" />
            New Notebook
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Your Notebooks</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {notebooks.map((notebook) => (
                  <SidebarMenuItem key={notebook.id}>
                    <div className="flex items-center justify-between w-full group">
                      <SidebarMenuButton
                        asChild
                        onClick={() => onSelectNotebook(notebook)}
                      >
                        <a href={`#notebook-${notebook.id}`}>{notebook.title}</a>
                      </SidebarMenuButton>
                      <button
                        onClick={() => handleRename(notebook.id, notebook.title)}
                        className="p-2 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-label="Rename Notebook"
                      >
                        <PencilIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
        <SidebarFooter className="mt-auto flex justify-center">
          <Button
            onClick={handleSignOut}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 rounded w-full flex items-center gap-2"
          >
            <LogOut className="w-5 h-5 text-gray-700" />
            Log Out
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Render Modal for Creating Notebook */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CardWithForm onCancel={closeModal} onSubmit={addNotebook} />
        </div>
      )}

      {/* Render Modal for Renaming or Deleting Notebook */}
      <RenameNotebookModal
        isOpen={isRenameModalOpen}
        currentTitle={currentTitle}
        onClose={() => setIsRenameModalOpen(false)}
        onSubmit={handleRenameSubmit}
        onDelete={handleDeleteNotebook} // Pass delete function to modal
      />
    </>
  );
}

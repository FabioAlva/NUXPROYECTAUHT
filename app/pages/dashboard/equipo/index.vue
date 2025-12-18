<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout", // Debe coincidir con el nombre del archivo en la carpeta layouts
});

import type { TableColumn } from "@nuxt/ui";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");
const UInput = resolveComponent("UInput");
const UBadge = resolveComponent("UBadge");
const UAvatar = resolveComponent("UAvatar");

const toast = useToast();

const selectedRows = ref<User[]>([]);
const table = ref(); // Referencia a la tabla
const editingUser = ref<User | null>(null); // Nuevo: usuario que se está editando
const open = ref(false);
const openEdit = ref(false); // Nuevo: para el modal de edición

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

const data = ref<User[]>([
  {
    id: 1,
    name: "Gaston Alvarez",
    email: "ga@gmial.com",
    role: "admin",
    created_at: "2024-01-15",
  },
  {
    id: 1,
    name: "Gaston Alvarez",
    email: "zzzzzz@gmial.com",
    role: "admin",
    created_at: "2024-01-15",
  },
  {
    id: 1,
    name: "Gaston Alvarez",
    email: "ssssss@gmial.com",
    role: "admin",
    created_at: "2024-01-15",
  },
]);

const columns: TableColumn<User>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Email",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => row.original.role,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => row.original.created_at,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return h("div", { class: "flex gap-2" }, [
        h(UButton, {
          icon: "i-heroicons-pencil-square",
          size: "sm",
          color: "primary",
          variant: "ghost",
          onClick: () => {
            console.log("Delete", row.original.id);
            open.value = true;
          },
        }),
        h(UButton, {
          icon: "i-heroicons-trash",
          size: "sm",
          color: "red",
          variant: "ghost",
          onClick: () => openEditModal(row.original), // Actualizado
        }),
      ]);
    },
    enableSorting: false,
  },
];
// Nuevo: función para abrir el modal de edición
const openEditModal = (user: User) => {
  editingUser.value = { ...user }; // Clonar el usuario para no modificar el original
  openEdit.value = true;
};

// Nuevo: función para guardar los cambios
const saveChanges = () => {
  console.log(data.value);
  if (editingUser.value) {
    const index = data.value.findIndex((u) => u.id === editingUser.value!.id);

    if (index !== -1) {
      data.value[index] = { ...editingUser.value };
      toast.add({
        title: "Success",
        description: "User updated successfully",
      });
    }
  }
  openEdit.value = false;
  editingUser.value = null;
};
</script>

<template>
  <div class="flex-1 divide-y divide-accented w-full">
    <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
      <UInput
        placeholder="Filter emails..."
        :model-value="(table?.tableApi.getColumn('email')?.getFilterValue() as string)"
        @update:model-value="
          table?.tableApi.getColumn('email')?.setFilterValue($event)
        "
      />

      <UDropdownMenu>
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
          class="ml-auto"
          aria-label="Columns select dropdown"
        />
      </UDropdownMenu>
    </div>

    <UTable
      :data="data"
      :columns="columns"
      ref="table"
      v-model:selected="selectedRows"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </UTable>

    <div class="px-4 py-3.5 text-sm text-muted">
      {{ selectedRows.length }} of {{ data.length }} row(s) selected.
    </div>
  </div>

  <UModal
    v-model:open="open"
    title="Modal with footer"
    description="This is useful when you want a form in a Modal."
    :ui="{ footer: 'justify-end' }"
  >
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-48" />
    </template>

    <template #footer="{ close }">
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        @click="close"
      />
      <UButton label="Submit" color="neutral" @click="saveChanges" />
    </template>
  </UModal>
</template>

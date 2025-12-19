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
const USwitch = resolveComponent("USwitch");

const toast = useToast();
const { client, user: currentUser } = useAuth();
const {
  openDialog,
  estado,
  state,
  users,
  pagination,
  DataEditUser,
  rowSelection,
  statusFilter,
  columnFilters,
  getRowItems,
  totalUsers,
  roleOptions,
} = useAddModal();

const selectedRows = ref<User[]>([]);
const table = ref(); // Referencia a la tabla
const editingUser = ref<User | null>(null); // Nuevo: usuario que se está editando
const open = ref(false);
const openEdit = ref(false); // Nuevo: para el modal de edición

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  banned: boolean;
};

const columns: TableColumn<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "white",
        variant: "ghost",
        label: "Email",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5 hover:bg-[var(--color-venice-blue-900)]",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const normalizeToBool = (v: unknown) => Number(v) === 0;
      const boolToNumber = (b: boolean) => (b ? 0 : 1);

      async function handleToggle(value: boolean) {
        row.original.banned = boolToNumber(value) as any;
        try {
          await client.admin.updateUser({
            userId: row.original.id,
            data: { banned: Boolean(row.original.banned) },
          });
          toast.add({
            title: "Actualizado",
            description: `Estado de ${row.original.name} actualizado correctamente`,
            color: "success",
          });
        } catch (error) {
          toast.add({
            title: "Error",
            description: `No se pudo actualizar el estado`,
            color: "error",
          });
          row.original.banned = boolToNumber(!value) as any;
        }
      }

      return h("div", { class: "flex items-center justify-center gap-3" }, [
        h(USwitch, {
          modelValue: normalizeToBool(row.original.banned),
          "onUpdate:modelValue": handleToggle,
          disabled: row.original.id === currentUser.value?.id,
        }),
      ]);
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return h("div", { class: "flex justify-center gap-2" }, [
        h(UButton, {
          icon: "i-heroicons-pencil-square",
          size: "sm",
          color: "primary",
          variant: "ghost",
          onClick: () => {
            DataEditUser(row.original);
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
  },
];

watch(
  () => statusFilter.value,
  (newVal) => {
    if (!table?.value?.tableApi) return;

    const statusColumn = table.value.tableApi.getColumn("status");
    if (!statusColumn) return;

    if (newVal === "all") {
      statusColumn.setFilterValue(undefined);
    } else {
      statusColumn.setFilterValue(newVal);
    }
  }
);

// Nuevo: función para guardar los cambios

// safasf

async function handlePageChange(newPageIndex: number) {
  pagination.value.pageIndex = newPageIndex - 1;
  const { users: u, total } = await listUsers(
    pagination.value.pageIndex,
    pagination.value.pageSize
  );
  users.value = u;
  totalUsers.value = total;
}

async function listUsers(pageIndex = 0, pageSize = 14) {
  const { data } = await client.admin.listUsers({
    query: {
      limit: pageSize,
      offset: pageIndex * pageSize,
      sortBy: "createdAt",
    },
  });
  return {
    users:
      data?.users.map((u) => {
        return {
          ...u,
          role: roleOptions.find((r) => r.value === u.role)?.label,
          banned: Number(u.banned),
        };
      }) ?? [],
    total: data?.total ?? 0,
  };
}

onMounted(async () => {
  console.log("Usuario actual:", currentUser.value);

  if (!users.value.length) {
    const { users: u, total } = await listUsers(
      pagination.value.pageIndex,
      pagination.value.pageSize
    );
    users.value = u;
    totalUsers.value = total;
  }
});
</script>

<template>
  <div class="flex-1 divide-y divide-accented w-full">
    <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Búsqueda por nombre"
        :model-value="(table?.tableApi.getColumn('name')?.getFilterValue() as string)"
        @update:model-value="
          table?.tableApi.getColumn('name')?.setFilterValue($event)
        "
      />

      <UsersAddModal :list-users="listUsers" class="ml-auto" />
    </div>

    <UTable
      :data="users"
      :columns="columns"
      ref="table"
      v-model:selected="selectedRows"
      sticky
      class="shrink-0 flex-1 max-h-[calc(100vh-19rem)] table-auto text-white"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody:
          '[&>tr:last-child>td:first-child]:rounded-bl-lg [&>tr:last-child>td:last-child]:rounded-br-lg [&>tr:last-child>td]:border-b [&>tr:last-child>td]:border-[#d1d5db]',
        th: 'py-1 first:rounded-tl-lg last:rounded-tr-lg border-y first:border-l last:border-r bg-[var(--color-venice-blue-800)] text-[#cfd6dd] text-center border border-[#d1d5db] text-[0.88rem] font-semibold',
        td: 'py-1 border-b first:border-l last:border-r bg-[#aaa] text-[#000] border border-[#d1d5db] text-[0.8rem] text-center',
      }"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </UTable>
  </div>

  <div class="flex items-center justify-end gap-3 pt-4 mt-auto">
    <!-- <div class="text-sm text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} de
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} fila(s) seleccionada(s).
    </div> -->

    <div class="flex items-center gap-1.5">
      <UPagination
        :page="pagination.pageIndex + 1"
        :items-per-page="pagination.pageSize"
        :total="totalUsers"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

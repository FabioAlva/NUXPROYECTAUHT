import * as z from "zod";
import type { User } from "~/types";
import type { TableRow } from "@nuxt/ui";

const userId: any = ref(null);
const openDialog = ref(false);
const estado = ref(false);
const users: any = ref([]);
const rowSelection = ref({ 1: true });
const pagination = ref({
  pageIndex: 0,
  pageSize: 14,
});
const statusFilter = ref("all");
const totalUsers = ref(0);
const columnFilters = ref([
  {
    id: "name",
    value: "",
  },
]);

const roleOptions = [
  {
    label: "Administrador",
    value: "admin",
  },
  {
    label: "Usuario",
    value: "user",
  },
];

const schema: any = computed(() =>
  z.object({
    name: z.string("El nombre es requerido").min(2, "Demasiado corto"),
    email: z.string("El correo es requerido").email("Correo inválido"),
    role: z.string("El rol es requerido").min(2, "Demasiado corto"),
    password: estado.value
      ? z.string().optional()
      : z.string("La contraseña es requerida").min(2, "Demasiado corto"),
  })
);

const state = reactive<Partial<z.output<ReturnType<typeof schema.value>>>>({
  name: undefined,
  email: undefined,
  role: undefined,
  password: undefined,
});

export function useAddModal() {
  function cancel() {
    openDialog.value = false;
    state.name = undefined;
    state.email = undefined;
    state.role = undefined;
    state.password = undefined;
    estado.value = false;
  }

  function getRowItems(user: User) {
    return [
      {
        type: "label",
        label: "Acciones",
      },
      {
        type: "separator",
      },
      {
        label: "Editar usuario",
        icon: "i-lucide-edit",
        color: "primary",
        onSelect() {
          DataEditUser(user);
        },
      },
      // {
      //   label: 'Eliminar usuario',
      //   icon: 'i-lucide-trash',
      //   color: 'error',
      //   onSelect() {
      //   }
      // }
    ];
  }

  function DataEditUser(user: User) {
    state.name = user.name;
    state.email = user.email;
    state.role = user.role;
    userId.value = user.id;
    openDialog.value = true;
    estado.value = true;
  }

  return {
    openDialog,
    estado,
    state,
    schema,
    roleOptions,
    users,
    DataEditUser,
    cancel,
    pagination,
    rowSelection,
    statusFilter,
    columnFilters,
    getRowItems,
    totalUsers,
    userId,
  };
}

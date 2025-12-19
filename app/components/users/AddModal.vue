<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps<{ listUsers: Function }>();

const { client, user: currentUser } = useAuth();

const schema = z.object({
  email: z.string().email("Invalid email"), // Corrección menor en sintaxis Zod
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const {
  openDialog,
  estado,
  state,
  roleOptions,
  cancel,
  users,
  userId,
  pagination,
  totalUsers,
} = useAddModal();

const toast = useToast();

async function reloadUser() {
  const { users: u, total } = await props.listUsers(
    pagination.value.pageIndex,
    pagination.value.pageSize
  );
  users.value = u;
  totalUsers.value = total;
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!estado.value) {
    const { error } = await client.admin.createUser({
      email: event.data.email,
      name: event.data.name,
      password: event.data.password,
      role: event.data.role as "user",
    });

    try {
      if (error) {
        toast.add({
          title: "Error",
          description: `El usuario ${event.data.name} no pudo ser creado`,
          color: "error",
        });
        openDialog.value = false;
      } else {
        toast.add({
          title: "Exito",
          description: `El usuario ${event.data.name} ha sido creado con exito`,
          color: "success",
        });
        await reloadUser();
        openDialog.value = false;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    const { error } = await client.admin.updateUser({
      userId: userId.value,
      data: {
        email: event.data.email,
        name: event.data.name,
        role: event.data.role,
      },
    });
    try {
      if (error) {
        toast.add({
          title: "Error",
          description: `El usuario ${event.data.name} no pudo ser editado`,
          color: "error",
        });
        openDialog.value = false;
        cancel();
      } else {
        toast.add({
          title: "Exito",
          description: `El usuario ${event.data.name} ha sido editado con exito`,
          color: "success",
        });
        await reloadUser();
        openDialog.value = false;
        cancel();
      }
    } catch (error) {
      console.log(error);
    }
  }
  cancel();
}

const show = ref(false);
const password = ref("");
</script>

<template>
  <UModal
    v-model:open="openDialog"
    :title="`${estado ? 'Editar' : 'Agregar'} usuario`"
    overlay
    :description="`${estado ? 'Edición' : 'Registro'} de usuarios`"
    :close="{
      color: 'error',
      variant: 'outline',
      class: 'rounded-full',
      onClick: cancel,
    }"
  >
    <UButton :label="`Agregar usuario`" icon="i-lucide-plus" />
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Nombre" placeholder="John Doe" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField
          label="Correo electrónico"
          placeholder="john.doe@example.com"
          name="email"
        >
          <UInput v-model="state.email" class="w-full" />
        </UFormField>
        <UFormField
          v-if="!estado"
          label="Contraseña"
          placeholder="12345678"
          name="password"
        >
          <UInput
            v-model="state.password"
            placeholder="Password"
            class="w-full"
            :type="show ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="show"
                aria-controls="password"
                @click="show = !show"
              />
            </template>
          </UInput>
        </UFormField>
        <UFormField label="Rol" placeholder="Admin" name="role">
          <USelect
            :items="roleOptions"
            v-model="state.role"
            class="w-full"
            :disabled="userId === currentUser?.id"
          />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="solid"
            @click="cancel"
          />
          <UButton
            :label="`${estado ? 'Editar' : 'Guardar'} usuario`"
            color="primary"
            variant="solid"
            type="submit"
            loading-auto
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>

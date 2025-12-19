<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout", // Debe coincidir con el nombre del archivo en la carpeta layouts
});

useSeoMeta({
  title: "Dashboard | TGIPROYECTS",
});

const { user } = await useAuth();

console.log("Current User:", user?.value.name);

const name = ref(user?.value?.name || "Usuario");
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 text-center">
      ¡Bienvenido de vuelta {{ name }} !
    </h1>
    <div class="mt-6">
      <p class="text-gray-700">
        Aquí puedes gestionar todo lo relacionado con tu trabajo en TGI.
      </p>

      <ul class="mt-3 space-y-2 list-disc list-inside text-gray-600">
        <li>
          <strong>Gestionar tareas:</strong> crear, asignar y actualizar el
          estado de las tareas.
        </li>
        <li>
          <strong>Proyectos:</strong> organizar tareas por proyecto y ver el
          progreso general.
        </li>
        <li>
          <strong>Equipo:</strong> administrar miembros, roles y permisos.
        </li>
        <li>
          <strong>Reportes y analíticas:</strong> consultar métricas e historial
          de actividad.
        </li>
        <li>
          <strong>Configuración:</strong> ajustar preferencias de cuenta y del
          sistema.
        </li>
      </ul>
    </div>
  </div>
</template>

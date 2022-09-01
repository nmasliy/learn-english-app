<template>
  <div class="home">
    <button
      class="px-6 py-4 w-60 bg-cyan-500 text-slate-50 font-semibold rounded transition-colors hover:bg-cyan-600"
    >
      Start
    </button>
    <div class="cards mt-16">
      <div
        class="card mx-auto w-96 h-64 p-8 flex flex-col items-center justify-center bg-white shadow-md rounded"
      >
        <h4 class="text-3xl">Long</h4>
        <h4 class="italic mb-6">[lôNG]</h4>
        <h4 class="text-2xl mb-6">Длинный</h4>
        <div class="flex gap-x-3 w-full">
          <button
            class="w-full px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-colors hover:bg-cyan-600"
          >
            Translate
          </button>
          <button
            class="w-full px-6 py-4 bg-cyan-500 text-slate-50 font-semibold rounded transition-colors hover:bg-cyan-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style lang="scss">
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}
.scale-slide-enter-from {
  left: -100%;
}
.scale-slide-enter-to {
  left: 0%;
}
.scale-slide-leave-from {
  transform: scale(1);
}
.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>

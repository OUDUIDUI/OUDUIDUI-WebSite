<template>
  <div class="modal-page" :class="isActive ? 'active' : ''">
    <div class="mask" @click="toggleModal">
      <div class="main" @click.stop="">
        <slot />
      </div>
    </div>

  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>

<template>
  <div class="modal-page" :class="isActive ? 'active' : ''">
    <div class="mask" @click="toggleModal">
      <div class="main" @click.stop="">
        <slot />
      </div>
    </div>

  </div>
</template>

<script src="./Modal.js"></script>

<style src="./Modal.css" scoped></style>

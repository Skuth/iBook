<template>
  <div class="presentation">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti molestias, ex eos cum fugit suscipit perferendis aperiam qui. Ut sit voluptates porro reprehenderit consectetur odit facilis omnis aliquam rerum quidem!</p>

    <img src="@/assets/img/presentation.svg" alt="Apresentação do iBook">
  </div>
</template>

<style lang="scss" scoped>
  .presentation {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    align-items: center;
    @include screen('small', 'medium') {
      grid-template-columns: 1fr;
    }
    p {
      line-height: 26px;
    }
    img {
      max-width: 100%;
    }
  }
</style>

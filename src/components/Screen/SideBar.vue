<template>
  <md-app-drawer :md-active.sync="menuVisible" v-on:="onchange">
    <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

    <md-list>
      <md-list-item>
        <md-icon>move_to_inbox</md-icon>
        <span class="md-list-item-text">Inbox</span>
      </md-list-item>

      <md-list-item>
        <md-icon>send</md-icon>
        <span class="md-list-item-text">Sent Mail</span>
      </md-list-item>

      <md-list-item>
        <md-icon>delete</md-icon>
        <span class="md-list-item-text">Trash</span>
      </md-list-item>

      <md-list-item>
        <md-icon>error</md-icon>
        <span class="md-list-item-text">Spam</span>
      </md-list-item>
    </md-list>
  </md-app-drawer>
</template>
<script>
export default {
  name: 'SideBar',
  data: () => ({
    menuVisible: false,
  }),
  methods: {
    onchange: function () {
      console.log('menuVisible', this.menuVisible)
      this.menuVisible = !this.menuVisible
    }
  },
}
</script>

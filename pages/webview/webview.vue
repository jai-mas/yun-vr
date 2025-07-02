     <template>
       <web-view :src="url"></web-view>
     </template>

     <script>
     export default {
       data() {
         return {
           pageurl: ''
         }
       },
       onLoad(options) {
         this.pageurl = decodeURIComponent(options.url || '');
       }
     }
     </script>
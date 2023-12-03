<template>
    <div>
        <HelloWorld msg="after global config for component !" />
    </div>
    <div>
        <el-button mb-2 @click="">Switch Language</el-button>
        <br />

        <el-config-provider locale="locale">
            <el-affix :offset="120">
                <el-button type="primary">Offset top 120px</el-button>
            </el-affix>
            Scroll down to see the bottom-right button.
            <el-backtop :right="100" :bottom="100" />


            <div>
                <elButton @click="elBtnClick">element ui btn</elButton>

                <el-row class="mb-4">
                    <el-button>Default</el-button>
                    <el-button type="primary">Primary</el-button>
                    <el-button type="success">Success</el-button>
                    <el-button type="info">Info</el-button>
                    <el-button type="warning">Warning</el-button>
                    <el-button type="danger">Danger</el-button>
                </el-row>

                <el-row>
                    <el-button :icon="Search" circle />
                    <el-button type="primary" :icon="Edit" circle />
                    <el-button type="success" :icon="Check" circle />
                    <el-button type="info" :icon="Message" circle />
                    <el-button type="warning" :icon="Star" circle />
                    <el-button type="danger" :icon="Delete" circle />
                </el-row>
            </div>
        </el-config-provider>
    </div>
    <div class="greetings">
        <h3 @click="$emit('someEvent', 20)" class="green">{{ msg }} {{ $attrs }}</h3>
        <h3>
            <p id="idpm" :class="pm" name="p">myindex may be you will doing great and best i gees !</p>
            <!-- You’ve successfully created a project with
            <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
            <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. -->
        </h3>
        <!-- <div >{{html1}}</div> -->
        <!-- <div v-html="html1"></div> -->
        <p>Has published books:</p>
        <span>{{ author.books.length > 0 ? 'Yes' : 'no' }}</span>
        <br />
        <span>{{ publishedmsg }}</span>
        <div :class="{ active: isActive }">active is true always</div>

        <div class="static" :class="{ active: isActive, 'text-danger': hasError }">
            danger views by blue color
        </div>
        <div :class="classObject"></div>

        <h1 v-if="awesome">Vue is awesome!</h1>
        <button @click="awesome = !awesome">Toggle</button>

        <h1 v-if="awesome">Vue is awesome!</h1>
        <h1 v-else>Oh no 😢</h1>

        <ul>
            <li v-for="(value, key, index) in author.books" :key="key">
                {{ index }}. {{ key }}: {{ value }}
            </li>
        </ul>
        <li v-for="(value, key) in myObject" :key="key">{{ key }}: {{ value }}</li>
        <li v-for="(value, key, index) in myObject" :key="key">{{ index }}. {{ key }}: {{ value }}</li>
        <span v-for="n in 10" :key="n">{{ n }}</span><br />
        <button @click="say('hello')">Say hello</button>
        <button @click="say('bye')">Say bye</button>
        <button @click="(event) => warn('Form cannot be submitted yet.', event)">Say bye</button>
        <button @keyup.enter="say('bye')">Say bye just only enter</button>
        <button @keyup.enter.ctrl="say('bye')">Say bye ctrl+enter</button><br />

        <input v-model="text" />
        <p>Message is: {{ message }}</p>
        <input v-model="message" placeholder="edit me" />

        <p>
            Ask a yes/no question:
            <input v-model="question" placeholder="happy yes?" />
        </p>
        <p>{{ answer }}</p>

        <input ref="refel" placeholder="refel" />
    </div>

    <div>
        <searchText></searchText>
        <!-- <CustomInput v-model:model-value="searchText" aria-placeholder="searchText">
      <template v-slot:header="{ count }">
        <span>Fallthrough attribute: {{ $attrs }} {{ (this.state = count) }}</span>
      </template>
      <template v-slot:footer>
        <span>{{ this.state }}</span>
      </template>
    </CustomInput> -->
    </div>

    <template>
        <!-- <HomeView modelValue=" in myindex view ">my HomeView in here </HomeView> -->
    </template>
    <div>
        <div>
            <!-- <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="100" height="100" /> -->
        </div>
    </div>
</template>
<script lang="ts"
  src="./myindex.ts">
                                //   import via from 
  </script>
<style lang="scss"
  scoped>
  @import './myindex.scss'
</style>

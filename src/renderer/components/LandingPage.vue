<style scoped>
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>Option 1</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="search"></Icon>
                        <span>Option 2</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="settings"></Icon>
                        <span>Option 3</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <!-- <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header> -->
                <Content :style="{padding: '0 16px 16px'}">
                    <Card>
                        <Input v-model="serialSend" style="padding-left:15px;padding-right:15px">
                            <Select v-model="serialSendFormat" slot="prepend" placement='top' style="width: 80px">
                                <Option value="serialSendStr">字符串</Option>
                                <Option value="serialSendHex">十六进制</Option>
                            </Select>
                            <Button slot="append" icon="android-send" @click="toSendData" style="background-color:#2d8cf0"></Button>
                        </Input>
                        <Checkbox v-model="sendEnter" size='large'>\r\n</Checkbox>
                        <!-- <div style="height: 600px">Content</div> -->
                        <terminal></terminal>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
  
  import terminal from './xterminal'
  
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  components: {
      terminal
    },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  }
};
</script>

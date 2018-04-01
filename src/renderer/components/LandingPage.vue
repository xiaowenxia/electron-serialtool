<template>
  <div id="wrapper">
    <!-- <Sider :style="{position: 'fixed', height: '100%', width: '250px', maxWidth: 'auto', left: 0, overflow: 'auto'}"> -->
      <Menu active-name="1" theme="light" :style="{position: 'fixed', height: '100%', width: '250px', maxWidth: 'auto', left: 0, overflow: 'auto'}">
          <MenuGroup title="串口设置">
              <!-- <MenuItem name="0">
                <Row>
                    <Col span="24">
                      <Switch size="large">
                          <span slot="open">开启</span>
                          <span slot="close">关闭</span>
                      </Switch>
                    </Col>
                </Row>
              </MenuItem> -->
              <MenuItem name="1">
                <Row>
                    <Col span="6">
                      <span>端口:</span>
                    </Col>
                    <Col span="12">
                      <Select v-model="portSelect" size="small">
                      <Option v-for="item in portList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                    <Col span="6">
                      <Button type="primary" shape="circle" size="small" icon="ios-loop" @click="toFreshPort" style="margin:0 auto;display:block"></Button>
                    </Col>
                </Row>
              </MenuItem>
              <MenuItem name="2">
                <Row>
                    <Col span="6">
                      <span style="width:80px">波特率:</span>
                    </Col>
                    <Col span="12">
                      <Select v-model="baudrateSelect" size="small">
                      <Option v-for="item in baudrateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                </Row>
              </MenuItem>
              <MenuItem name="3">
                <Row>
                    <Col span="6">
                      <span style="width:80px">数据位:</span>
                    </Col>
                    <Col span="12">
                      <Select v-model="databitSelect" size="small">
                      <Option v-for="item in databitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                </Row>
              </MenuItem>
              <MenuItem name="4">
                <Row>
                    <Col span="6">
                      <span style="width:80px">停止位:</span>
                    </Col>
                    <Col span="12">
                      <Select v-model="stopbitSelect" size="small">
                      <Option v-for="item in stopbitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                </Row>
              </MenuItem>
              <MenuItem name="5">
                <Row>
                    <Col span="6">
                      <span style="width:80px">校验:</span>
                    </Col>
                    <Col span="12">
                      <Select v-model="paritySelect" size="small">
                      <Option v-for="item in parityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                </Row>
              </MenuItem>
              <MenuItem name="6">
                <Row>
                    <Col span="24">
                      <Button :type="portButtonColor" long @click="toOpeningPort">{{portButtonLabel}}</Button>
                    </Col>
                </Row>
              </MenuItem>
          </MenuGroup>
          <MenuGroup title="统计分析">
              <MenuItem name="21">
                <Row>
                    <Col span="12">
                      <Icon type="ios-upload"></Icon>
                      <span style="margin-left:10px">发送</span>
                      
                    </Col>
                    <Col span="12">
                      <span>{{sendCnt}} bytes</span>
                    </Col>
                </Row>
                  
              </MenuItem>
              <MenuItem name="22">
                  <Row>
                    <Col span="12">
                      <Icon type="ios-download"></Icon>
                      <span style="margin-left:10px">接收</span>
                    </Col>
                    <Col span="12">
                      <span>{{recvCnt}} bytes</span>
                    </Col>
                  </Row>
              </MenuItem>
          </MenuGroup>
      </Menu>
    <!-- </Sider> -->
    <Layout>
      <Content :style="{padding: '0 16px 16px'}">
        <Card id="displayArea">
            <!-- <div id="terminalContain"></div> -->
            <Card id="recvArea" style="width:100%;height:100%"> </Card>
            <div>
              <Input v-model="serialSend" >
                  <Select v-model="serialSendFormat" slot="prepend" placement='top' style="width: 80px">
                    <Option value="serialSendStr">字符串</Option>
                    <Option value="serialSendHex">十六进制</Option>
                  </Select>
                  <Button slot="append" icon="android-send" @click="toSendData" style="background-color:#2d8cf0"></Button>
              </Input>
              <Checkbox v-model="sendEnter" size='large'>\r\n</Checkbox>
            </div>
            <!-- <div style="height: 600px">Content</div> -->
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
import SerialPort from "serialport";
import Vue from "vue";
import { Terminal } from "xterm";
import $ from 'jquery/dist/jquery.js'

// let term = new Terminal({
//   cursorBlink: true
// });
let portList = [],
  curPort,
  curPortState = false;

function freshPort() {
  /* 清除现有的串口 */
  portList = [];

  SerialPort.list(function(err, ports) {
    console.log("串口列表");
    ports.forEach(function(port) {
      console.log(port.comName);
      // console.log(port.pnpId);
      // console.log(port.manufacturer);

      portList.push({
        value: port.comName,
        label: port.comName
      });
    });
  });
}

freshPort();

export default {
  name: "landing-page",
  components: {},
  methods: {},
  data: function() {
    return {
      serialRecv: "",
      serialSend: "",
      serialSendFormat: "serialSendStr",
      portList: portList,
      portSelect: "",
      baudrateList: [
        {
          value: 9600,
          label: "9600"
        },
        {
          value: 19200,
          label: "19200"
        },
        {
          value: 38400,
          label: "38400"
        },
        {
          value: 57600,
          label: "57600"
        },
        {
          value: 115200,
          label: "115200"
        }
      ],
      baudrateSelect: 115200,
      databitList: [
        {
          value: 5,
          label: "5"
        },
        {
          value: 6,
          label: "6"
        },
        {
          value: 7,
          label: "7"
        },
        {
          value: 8,
          label: "8"
        }
      ],
      databitSelect: 8,
      stopbitList: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 1.5,
          label: "1.5"
        },
        {
          value: 2,
          label: "2"
        }
      ],
      stopbitSelect: 1,
      parityList: [
        {
          value: "none",
          label: "none"
        },
        {
          value: "Even",
          label: "Even"
        },
        {
          value: "Odd",
          label: "Odd"
        },
        {
          value: "Mark",
          label: "Mark"
        },
        {
          value: "Space",
          label: "Space"
        }
      ],
      paritySelect: "none",
      portButtonColor: "primary",
      portButtonLabel: "打开串口",
      sendEnter: true,
      sendCnt: 0,
      recvCnt: 0
    };
  },
  methods: {
    toFreshPort() {
      freshPort();
    },
    toSendData() {
      var that = this;
      if (curPortState === false) {
        console.log("未打开串口");
        return;
      }
      // console.log(this.serialSend)
      curPort.write(this.serialSend + "\r\n", err => {
        if (err) console.log(err);
        console.log("发送成功");
        that.sendCnt += that.serialSend.length;
      });
    },
    toOpeningPort() {
      var that = this;
      if (this.portSelect === "") {
        console.log("未选择串口");
        return;
      }
      console.log();
      if (curPortState === true) {
        curPort.close(err => {
          if (err) {
            return console.log("Error closing port: ", err.message);
          }
          console.log("close ok");
          curPortState = false;
          that.portButtonLabel = "打开串口";
          that.portButtonColor = "primary";
        });
        return;
      }

      let option = {
        baudRate: this.baudrateSelect,
        dataBits: this.databitSelect,
        stopBits: this.stopbitSelect,
        parity: this.paritySelect,
        autoOpen: false
      };

      curPort = new SerialPort(this.portSelect, option, function(err) {
        if (err) {
          console.log("Error: ", err.message);
          curPortState = false;
          that.portButtonLabel = "打开串口";
        }
      });

      // Switches the port into "flowing mode"
      // curPort.on('data', function (data) {
      //   console.log('Data:' + data);
      // });

      const Readline = SerialPort.parsers.Readline;
      const parser = new Readline({ delimiter: "\r\n" });
      curPort.pipe(parser);
      // parser.on('data', console.log)
      parser.on("data", data => {
        var recvArea = document.getElementById('recvArea')
        var recvArea = $("#recvArea .ivu-card-body")
        console.log(recvArea)
        var newLine = document.createElement('div')
        newLine.innerText = data
        recvArea.append(newLine)
        //term.write(data);
        that.recvCnt += data.length;
      });

      // Read data that is available but keep the stream from entering "flowing mode"
      curPort.on("error", function(err) {
        console.log("something error");
        console.log(err);
      });

      curPort.open(err => {
        if (err) {
          return console.log("Error opening port: ", err.message);
        }
        console.log("open success");
        curPortState = true;
        that.portButtonLabel = "关闭串口";
        that.portButtonColor = "error";
      });
    }
  },
  mounted: function() {
    console.log("mounted");
    // term.open(document.getElementById("terminalContain"));
    // term.write("没有数据");
  }
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* body { font-family: 'Source Sans Pro', sans-serif; } */
.layout-con {
  height: 100%;
  width: 100%;
}
#wrapper {
  /* background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  width: 100vw; */
  /* border: 1px solid #d7dde4; */
  background: #f5f7f9;
  /* position: relative; */
  border-radius: 4px;
  /* overflow: hidden; */
}

#displayArea .ivu-card-body {
  position: fixed;
  right: 0px;
  left: 250px;
  bottom: 40px;
  top: 0px;
  overflow: auto;
}
#contentArea {
  position: fixed;
  height: auto;
  top: 0;
  left: 240px;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 235, 205, 0.16);
}
#terminal {
  overflow: auto;
  height: 90%;
  width: 100%;
  margin: 20px 20px 10px 20px;
  background-color: white;
  border-radius: 20px;
  font-size: 18px;
  width: 800px;
  height: 450px;
  margin: 0 auto;
  padding: 2px;
}
#xterm-container div {
  margin-left: 10px;
}
</style>

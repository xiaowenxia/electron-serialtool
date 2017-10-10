<template>
  <div id="wrapper">
    <Menu active-name="1">
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
                    <Button type="primary" shape="circle" size="small" icon="ios-loop" style="margin:0 auto;display:block"></Button>
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
                    <span>0 bytes</span>
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
                    <span>0 bytes</span>
                  </Col>
                </Row>
            </MenuItem>
        </MenuGroup>
    </Menu>
    <div id="recv-area">
      <div id="app" style="height: 90%;width:100%">
        <div>fdsafd</div>
      </div>
      <!-- <Input v-model="serialRecv" type="textarea" :rows="28" placeholder="暂时没有数据"></Input> -->
      <!-- <p contenteditable="true">{{serialRecv}}</p> -->
      <!-- <p>{{serialRecv}}</p> -->
      <Input v-model="serialSend">
        <Select v-model="serialSendFormat" slot="prepend" style="width: 80px">
            <Option value="serialSendStr">字符串</Option>
            <Option value="serialSendHex">十六进制</Option>
        </Select>
        <Button slot="append" icon="android-send" @click="toSendData"></Button>
      </Input>
    </div>
    <br>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import SerialPort from 'serialport'
  import Vue from 'vue'

  let portList = [], curPort, curPortState = false

  SerialPort.list(function (err, ports) {
    console.log("串口列表")
    ports.forEach(function(port) {
      console.log(port.comName);
      // console.log(port.pnpId);
      // console.log(port.manufacturer);

      
      portList.push({
        value: port.comName,
        label: port.comName
      })
    });
  });
  

  export default {
    name: 'landing-page',
    components: {
      SystemInformation
    },
    methods: {
    },
    data: function () {
      return {
        serialRecv: '',
        serialSend: '',
        serialSendFormat: 'serialSendStr',
        portList: portList,
        portSelect: '',
        baudrateList: [
          {
            value: 9600,
            label: '9600'
          }, {
            value: 19200,
            label: '19200'
          }, {
            value: 38400,
            label: '38400'
          }, {
            value: 57600,
            label: '57600'
          }, {
            value: 115200,
            label: '115200'
          }],
        baudrateSelect: 115200,
        databitList: [
          {
            value: 5,
            label: '5'
          }, {
            value: 6,
            label: '6'
          }, {
            value: 7,
            label: '7'
          }, {
            value: 8,
            label: '8'
          }],
        databitSelect: 8,
        stopbitList: [
          {
            value: 1,
            label: '1'
          }, {
            value: 1.5,
            label: '1.5'
          }, {
            value: 2,
            label: '2'
          }],
        stopbitSelect: 1,
        parityList: [
          {
            value: 'none',
            label: 'none'
          }, {
            value: 'Even',
            label: 'Even'
          }, {
            value: 'Odd',
            label: 'Odd'
          }, {
            value: 'Mark',
            label: 'Mark'
          }, {
            value: 'Space',
            label: 'Space'
          }],
        paritySelect: 'none',
        portButtonColor: 'primary',
        portButtonLabel: '打开串口',
      }
    },
    methods: {
        toSendData(){
          if(curPortState === false)
          {
            console.log("未打开串口")
            return
          }
          curPort.write(this.serialSend)
        },
        toOpeningPort(){
            var that = this
            if(this.portSelect === '')
            {
              console.log("未选择串口")
              return
            }
            if(curPortState === true)
            {
              curPort.close((err) => {
                if (err) {
                  return console.log('Error closing port: ', err.message);
                }
                console.log("close ok")
                curPortState = false
                that.portButtonLabel = '打开串口'
                that.portButtonColor = 'primary'
              })
              return
            }

            this.openingPort = true
            let option = {
              baudRate: this.baudrateSelect,
              dataBits: this.databitSelect,
              stopBits: this.stopbitSelect,
              parity: this.paritySelect
            }
            
            curPort = new SerialPort(this.portSelect, option, function (err) {
              if (err) {
                console.log('Error: ', err.message)
                that.portButtonLabel = '打开串口'
                return
              }
              console.log("open success")
              curPortState = true
              that.portButtonLabel = '关闭串口'
              that.portButtonColor = 'error'
            })
            
            const Readline = SerialPort.parsers.Readline;
            const parser = new Readline();
            curPort.pipe(parser);
            parser.on('data', (data) => {
              console.log(data)
              // var rcvDataArea = Vue.extend({
              //   template: '<div>Hello World</div>'
              // })
              // console.log(new rcvDataArea())
              // new rcvDataArea().$mount().$appendTo('#recvArea');//appendTo
              var domApp = document.getElementById('app');
              var rcvData = document.createElement('p');
              rcvData.innerText = data;
              domApp.appendChild(rcvData);
            });

            // Read data that is available but keep the stream from entering "flowing mode"
            // curPort.on('readable', function () {
            //   let readData = curPort.read()
            //    that.serialRecv = that.serialRecv + readData
            //   // console.log('Data:', readData);
            // });
            
            // curPort.open((err) => {
            //   if (err) {
            //     console.log(err)
            //     return console.log('Error opening port: ', err.message);
            //   }
            //   console.log("open success")
            //   curPortState = true
            //   that.portButtonLabel = '关闭串口'
            //   that.portButtonColor = 'error'
            // })
        }
    }
  }
</script>

<style>
  /* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  /* body { font-family: 'Source Sans Pro', sans-serif; } */

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    width: 100vw;
  }

  #recv-area {
    position: fixed;
    height: auto;
    top:  0;
    left: 240px;
    bottom: 20px;
    right: 20px;
  }
</style>

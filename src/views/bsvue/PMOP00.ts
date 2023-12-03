import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  nextTick,
  type Ref,
  onBeforeUnmount
} from 'vue'

declare let window: Window & {
  JSZip: any
}

import debounce from 'lodash.debounce'
import * as echarts from 'echarts'
import { type ECharts } from 'echarts'
type EChartsOption = echarts.EChartsOption
export default defineComponent({
  name: '',
  components: {},
  setup: () => {
    const refObj = ref([
      {
        name: 'mike',
        age: 24,
        moto: 'live for life'
      }
    ])
    const reactiveObj = reactive({
      name: 'mike',
      age: 24,
      moto: 'live for life'
    })
    // const queryCondition = {
    //   CODE_CLASS: '',
    //   FILTER: '',
    //   PART_NAME: ''
    // };

    // 图表
    // cosnt fromInput = (<HTMLInputElement>document.getElementById('from_value')).value;
    // let chartDom: any = ref<HTMLDivElement>();
    // chartDom = document.getElementById('echarts')!;
    // const myChart = echarts.init(chartDom);

    // const myChartview: any = computed(() => {
    //   return myChartview as HTMLElement;
    // });
    // const myChart1 = echarts.init(myChartview);
    let option: EChartsOption
    const barEchartsRef = ref<HTMLDivElement>()
    const pieEchartsRef = ref<HTMLDivElement>()
    // const lineEchartsRef = ref<HTMLDivElement>();
    const lineEchartsRef = ref<HTMLElement>()
    let barEcharts: ECharts
    let pieEcharts: ECharts
    let lineEcharts: ECharts
    // let this = window;
    // 画面相关数据初始化
    const initializePage = async () => {
      //   const initialResult = await erFormHelper.Initialize(
      //     formPartition,
      //     formName,
      //     '',
      //     initializeService
      //   )
      //   if (initialResult.flag >= 0) {
      //     // 画面工具类初始化成功后将画面渲染条件设置为1
      //     initializeFlag.value = 1

      //     gridToolbar1.value = erFormHelper.getGridToolbar([
      //       { name: 'addrow', visible: false },
      //       { name: 'copyrow', visible: false },
      //       { name: 'delete', visible: false },
      //       { name: 'import', visible: false },
      //       { name: 'excel', visible: false }
      //     ])

      // 回调函数获取控件信息及设置定义事件等操作
      nextTick(() => {
        // 获取画面上的主要控件信息
        //       tabStrip1 = (kendoTabStrip.value as TabStrip)?.kendoWidget() as kendo.ui.TabStrip
        //       console.log('kendoTabStrip tick=', tabStrip1, kendoTabStrip, tabStripInstance)
        //       gridView_INQ = erFormHelper.getKendoGrid('gridView_INQ')
        //       erFormHelper.setGridColumnEditable(gridView_INQ, false)
        //       gridView_INQ?.bind('change', (event: kendo.ui.GridChangeEvent) => {
        //         const checkedRows = erFormHelper.getGridCheckedRowsAsBlock('gridView_INQ').data
        //         const a = checkedRows.length
        //         const b = 0
        //       })
        //       //   nextTick(() => {
        //       //     // tabStripInstance.value.select(1);
        //       //     initLineEcharts();
        //       //     window.addEventListener('resize', resizeHandler);
      })
      //     })
      //     // window.addEventListener('resize', resizeHandler);
      //     // 切换时刷新[解决tab页切换时grid冻结列可能会不显示的问题]
      //     // tabStrip1?.bind('show', (e: any) => {
      //     //   if (tabStrip1.select(0) === 'tab1') {
      //     //     gridView_INQ.refresh()
      //     //   } else {
      //     //     // gridView_INQ1.refresh();
      //     //   }
      //     // })
      //   } else {
      //     erFormHelper.messageError(
      //       'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
      //     )
      //   }
    }
    const pieOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
    const lineOptions = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['DEVO_WT', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'DEVO_WT',
          type: 'line',
          stack: 'Total',
          data: []
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    const getData = () => {
      //   const eiInfo = new EI.EIInfo()
      //   const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'NEWEPEP04')
      //   // pushdata是往我们的eiblock里边新增数据，可以增加一条也可以增加多条
      //   // 第一个参数是想要添加的数据，可以是键值对对象也可以是键值对数组
      //   // 第二个参数是boolean类型，是否自动补全列头数据信息，默认为false，我们这里传入true
      //   //   eiBlock.pushData(queryCondition, true);
      //   // 第一个参数传分区、第二个参数对应后台服务名、第三个参数是传入参数
      //   EIManager.callService('IPLAT4C', 'epep03_inq', eiInfo)
      //     .then((res: EI.EIInfo) => {
      //       if (res.status === 0) {
      //         const resData: any = res.blocks['Table0'].data
      //         // initBarEcharts(resData);
      //       } else {
      //         alert(res.msg)
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
    }

    //   const initBarEcharts = (data: any) => {
    //     barOptions.xAxis.data = data.map((item: any) => item.CODE_CLASS);
    //     barOptions.series[0].data = data.map((item: any) => item.CODE_LEN);
    //     if (barEchartsRef.value) {
    //       barEcharts = echarts.init(barEchartsRef.value);
    //       barEcharts.setOption(barOptions);
    //     }
    //   };

    //   const initPieEcharts = () => {
    //     if (pieEchartsRef.value) {
    //       pieEcharts = echarts.init(pieEchartsRef.value);
    //       pieEcharts.setOption(pieOptions);
    //     }
    //   };
    const initPieEcharts = () => {
      if (pieEchartsRef.value) {
        pieEcharts = echarts.init(pieEchartsRef.value)
        pieEcharts.setOption(pieOptions)
      }
    }
    const initLineEcharts = () => {
      console.log('initLineEcharts=', lineEchartsRef)
      //  barOptions.xAxis.data = data.map((item: any) => item.CODE_CLASS);
      //  barOptions.series[0].data = data.map((item: any) => item.CODE_LEN);
      if (lineEchartsRef.value) {
        lineEcharts = echarts.init(lineEchartsRef.value)
        lineEcharts.setOption(lineOptions)
      }
    }
    const initLineEchartsData = (data: any) => {
      console.log('initLineEcharts=', lineEchartsRef, data)
      lineOptions.xAxis.data = data.map((item: any) => item.ORDER_NO)
      lineOptions.series[0].data = data.map((item: any) => item.DEVO_WT)
      lineOptions.series[1].data = data.map((item: any) => item.DEVO_WT)
      if (lineEchartsRef.value) {
        lineEcharts = echarts.init(lineEchartsRef.value)
        lineEcharts.setOption(lineOptions)
      }
    }
    const resizeHandler = debounce(async () => {
      //   //   barEcharts.resize();
      //   if (!erFormHelper.checkRequiredInput('LayoutGroupFilter')) {
      //     return
      //   }
      //   const queryCondition = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter')
      //   const inInfo = new EI.EIInfo()
      //   const inInfo1 = new EI.EiBlock()
      //   inInfo.addBlock(queryCondition)
      //   console.log(inInfo)
      //   console.log(inInfo1)
      //   const outBlock = await erFormHelper.callService('pmop00', inInfo, true, true)
      //   console.log(outBlock)
      //   //   if (outBlock.sys.status < 0) return;
      //   //   erFormHelper.mergeDataToGrid(outBlock.getBlock(0), 'gridView_INQ');
      //   initLineEchartsData(outBlock.getBlock(0).data)
      //   pieEcharts.resize()
      //   lineEcharts.resize()
    }, 200)
    //设置工具栏是否可用
    const setToolBar = (visible: boolean) => {
      //   erFormHelper.setGridToolbarVisible('gridView_INQ', [
      //     { name: 'addrow', visible: visible },
      //     { name: 'copyrow', visible: visible },
      //     { name: 'delete', visible: visible },
      //     { name: 'import', visible: visible },
      //     { name: 'excel', visible: visible },
      //     { name: 'import', visible: visible },
      //     { name: 'excel', visible: visible }
      //   ])
    }
    const p_query2 = async () => {
      //   console.log('进来了')
      //   console.log(erFormHelper.getKendoGrid('gridView_INQ'))
      //   if (!erFormHelper.checkRequiredInput('LayoutGroupFilter')) {
      //     return
      //   }
      //   const queryCondition = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter')
      //   const inInfo = new EI.EIInfo()
      //   const inInfo1 = new EI.EiBlock()
      //   inInfo.addBlock(queryCondition)
      //   console.log(inInfo)
      //   console.log(inInfo1)
      //   const outBlock = await erFormHelper.callService('pmop00', inInfo, true, true)
      //   console.log(outBlock)
      //   if (outBlock.sys.status < 0) return
      //   erFormHelper.mergeDataToGrid(outBlock.getBlock(0), 'gridView_INQ')
      //   if (outBlock.blocks[0].data.length < 1)
      //     // 根据返回数据加载页面显示数据
      //     //erFormHelper.mergeDataToLayoutOrGrid(outBlock);
      //     // 获取单记录区域的第一行数据信息-根据页面需求，可以不写
      //     mainTableModel = erFormHelper.getModelFromDataSource('LayoutGroupFilter')
    }

    onMounted(() => {
      initializePage()
      //   getData();
      initPieEcharts()
      initLineEcharts()
      window.addEventListener('click', resizeHandler)
    })
    onBeforeUnmount(() => {
      // barEcharts.dispose();
      pieEcharts.dispose()
      lineEcharts.dispose()
      window.removeEventListener('click', resizeHandler)
    })

    const F2_DO = async (e: any) => {
      // erFormHelper.messageWarning('请先选择要匹配客户的材料');
      //   if (await erFormHelper.messageConfirm('确认要查询吗？')) {
      //     p_query2()
      //   }
    }
    const F3_DO = async (e: any) => {
      //   console.log('f3 enter=', gridView_INQ)
      //   //getGridSelectRowsAsBlock
      //   //getGridCheckedRows
      //   const checkedRows = erFormHelper.getGridCheckedRowsAsBlock(gridView_INQ)
      //   if (checkedRows.data.length < 1) {
      //     erFormHelper.messageInfo('请选择需操作的记录。')
      //     return
      //   }
      //   const eiInfo = new EI.EIInfo()
      //   const eiBlock = eiInfo.addBlock(checkedRows)
      //   console.log('callService before =', eiInfo)
      //   const res = await erFormHelper.callService('pmop00', eiInfo, true, true)
      //   if (res.sys.status < 0) return
      //   p_query2()
      //   console.log(erFormHelper.getKendoGrid('gridView_INQ'));
      //   const queryCondition = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
      //   const inInfo = new EI.EIInfo();
      //   const inInfo1 = new EI.EiBlock();
      //   console.log(inInfo);
      //   console.log(inInfo1);
      //   console.log(erFormHelper.getGridSelectRowsAsBlock);
      //   inInfo.addBlock(queryCondition);
      //   const outBlock = await erFormHelper.callService('pmop00', inInfo, true, true);
      //   console.log(outBlock);
      //   if (outBlock.sys.status < 0) return;
      //   erFormHelper.mergeDataToGrid(outBlock.getBlock(0), 'gridView_INQ');
    }
    const F3_PRE_DO = async (e: any) => {
      //   //   erFormHelper.setGridEditable('gridView_INQ', true);
      //   //   setToolBar(true);
      //   //getGridRows(grid: any, type: 'current' | 'select' | 'checked' | 'add' | 'modify' | 'delete' | 'all', toJson?: boolean): any[];
      //   const checkedRows = erFormHelper.getGridCheckedRowsAsBlock(gridView_INQ)
      //   if (checkedRows.data.length < 1) {
      //     erFormHelper.messageInfo('请选择需操作的记录。')
      //     return
      //   }
      //   const inInfo = new EI.EIInfo()
      //   inInfo.addBlock(erFormHelper.getGridSelectRowsAsBlock(gridView_INQ), 'TPAAM06')
      //   console.log(inInfo)
    }
    const F3_CANCEL = async (e: any) => {}
    const F4_DO = async (e: any) => {
      //   // routes.
      //   //   window.opener = null;
      //   //   window.open('', this);
      //   //   window.close();
      //   //   window.open(about:blank, _self).close();
      //   //   AppVue.Close();
      //   ;(this as any).window.close()
    }
    const F4_PRE_DO = async (e: any) => {
      //   setToolBar(true)
      //   console.log('ref=', refObj.value[0].name, typeof refObj.value)
      //   console.log('reactiveObj=', reactiveObj.name)
      //   console.log('TAB页IDtabStripInstance=', tabStripInstance)
      //   console.log('TAB页ID=', erFormHelper.getKendoTabStripSelectId(tabStrip1))
      //   console.log('TAB页ID=', erFormHelper.getKendoTabStripSelectId(tabStripInstance.value))
      //   tabStripInstance.value.select(1)
      //   if (erFormHelper.getKendoTabStripSelectId(tabStrip1) === 'tab2') {
      //     erFormHelper.messageWarning('请在[待组炉]页面中，选择信息进行操作。')
      //     return
      //   }
      //   console.log(tabStrip1.activateTab.name);
    }
    const F4_CANCEL = async (e: any) => {}
    const F5_DO = async (e: any) => {}
    const F5_PRE_DO = async (e: any) => {}
    const F5_CANCEL = async (e: any) => {}
    const LayoutGroupFilterQueryClick = (e: any) => {}
    const gridView_INQClick = async (e: any) => {}
    const gridView_INQDoubleClick = async (e: any) => {
      //   erFormHelper.messageWarning(refObj.value.toString())
    }
    const gridView_INQFocusChanged = async (e: any) => {}

    //一些有用的代码和函数

    //添加查询后台之前放入数据的ErUtils.buildEiBlock(
    const putDataInInfo = () => {
      //   const inInfo = new EI.EIInfo()
      //   inInfo.addBlock(ErUtils.buildEiBlock([{ OPERATE_TYPE: 'operateType' }], 'OPERATE_TYPE')) //第一个参数传入自定义列名和值，第二个参数传入指定表名
      //   //Block自定义多列demo
      //   inInfo.addBlock(
      //     ErUtils.buildEiBlock([
      //       {
      //         QUERY_TYPE: 'mixed',
      //         COMPANY_CODE: 'companyCode',
      //         PO_BILL_NO: 'billNo'
      //       }
      //     ])
      //   )
    }
    //获取查询条件的代码getControlValue
    const setPageInfo = async () => {
      //   const inInfo = new EI.EIInfo()
      //   let dt: EI.EiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter', {
      //     QUERY_TYPE: 'TSOSD30'
      //   })
      //   inInfo.addBlock(dt)
      //   dt = erFormHelper.getAllControlValueAsFilter('LayoutGroupFilter', {
      //     QUERY_TYPE: 'TSOSD30'
      //   })
      //   inInfo.addBlock(dt, 'QUERY_FILTER')
      //   const outInfo_q = await erFormHelper.callService('sosd06_inq', inInfo, false, true)
      //   if (outInfo_q.sys.status >= 0) {
      //     if (outInfo_q.getBlock('TSOSD30').data.length === 0) {
      //       erFormHelper.messageWarning('未查询到运输派车单信息[' + 'billNo' + ']')
      //       //resetPage();
      //       return
      //     }
      //     // 根据返回数据加载页面显示数据
      //     erFormHelper.mergeDataToLayoutOrGrid(outInfo_q)
      //   }
    }

    return {
      //   erFormHelper,
      //   initializeFlag,
      //   gridToolbar1,
      //   tabStrip1,
      //   tabStripRef,
      //   kendoTabStrip,
      //   myChartview,
      barEchartsRef,
      pieEchartsRef,
      lineEchartsRef,
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      F4_DO,
      F4_PRE_DO,
      F4_CANCEL,
      F5_DO,
      F5_PRE_DO,
      F5_CANCEL,
      LayoutGroupFilterQueryClick,
      gridView_INQClick,
      gridView_INQDoubleClick,
      gridView_INQFocusChanged
    }
  }
})

// /*
//  * @Description:
//  * @Author: Edward
//  * @Date: 2022-06-02 17:21:37
//  * @LastEditors: Edward
//  * @LastEditTime: 2022-08-16 09:58:17
//  */
// import { defineComponent, onMounted } from 'vue';
// import { EI, EIManager } from '@baosight/ei';
// import { EFNotify, EFUtility } from '@baosight/ef';
// // import ER from '@baosight/er';

// export default defineComponent({
//   name: 'DEMO02',
//   components: {},
//   setup: () => {
//     const { NotificationUtil, validatorTooltip } = EFNotify();

//     const callService = () => {
//       // Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。
//       //   Promise.all();
//       console.log(require.context('/'));
//       EFUtility.getCodeClassValue('BGNFM0', ['PM30'])
//         .then((res) => {
//           console.log(res);
//           if (res.blocks['PM30']) {
//             // 业务逻辑
//             console.log(res);
//             console.log(res.blocks['PM30']);
//           }
//         })
//         .catch((error) => {
//           console.log('res=' + error);
//           // 异常处理逻辑
//         });
//       console.log('enter');
//       const eiInfo = new EI.EIInfo();
//       const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'NEWEPEP01');
//       const queryConditon = {
//         code_class: '',
//         code_name: '',
//         code_source: '',
//         code_auth: '1',
//         code_line: '',
//         constcode_class: '123'
//       };
//       eiBlock.pushData(queryConditon, true);

//       EIManager.callService('BGNFM0', 'pmop01_inq', eiInfo)
//         .then((res: EI.EIInfo) => {
//           if (res.status >= 0) {
//             console.log(res);
//             console.log(res.blocks[0]);
//             console.log(res.sys);
//             console.log(res.blocks[0].data);
//             const resData: any = res.blocks['Table0'].data;
//           } else {
//             console.log('confirm');
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };

//     window.onload = () => {
//       console.log('onload');
//       //   callService();
//     };
//     const cilckEvent = () => {
//       //警告提示⚠
//       console.log(NotificationUtil({ message: 'please confirm !' }, 'warning'));
//       callService();
//     };

//     onMounted(() => {});
//     return {
//       cilckEvent
//     };
//   }
// });

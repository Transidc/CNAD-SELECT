# CNAD-SELECT
中国省市区联动选择

测试地址：https://github.transidc.com/cnad-select.html

调用方法：

<script src="/andx/cnadselect.js"></script>

<div id="testbox"><input type="text" name="area" class="input" value="500000,500117,500117005"></div>

<script>var x = new ANDX.cnadSelect({"container":"testbox"});</script>

使用说明：

1. container 是必须的参数，即外部容器的ID。

2. input 是可选的参数，即初始化数据和接收更新数据的容器的ID。

   a.设置此参数时，“input 容器” 可以不在 “container 容器” 内。
   
   b.当input的ID不存在时，按未设置input的方式执行。
   
   c.未设置时，会自动搜索 “container 容器” 内第1个 “INPUT” 元素作为 “input 容器”。
   
   d.如果input的ID未设置且 “container 容器” 内没有 “INPUT” 元素，将运行出错。
   
3. text 是可选的参数，即接收中文地址的容器的ID。

   “text 容器” 可以不在 “container 容器” 内。
   
   与 “input 容器” 的ID不能相同。

4. css 是可选的参数，即为JS生成的 “SELECT” 元素增加 className。

5. data 是可选的参数。

   data.path：数据的路径，默认为“/data/”。
   
   data.top：第1个加载数据名，默认为“data”。
   
   data.extension：文件扩展名，默认为“.json”。
   
   如果需要构造动态网址的，可以这样：“{"path":"/data/?d=", "top":"100000", "extension":""}”
   
Powered by Transidc.com
   
Github: https://github.com/Transidc/CNAD-SELECT/
   
数据包来源：https://github.com/adyliu/china_area/

#!/bin/sh
#首行代码是标明文件是shell脚本，在linux中是没有文件类型概念的
cd F:/Code/vscode/FrontEndCodeDemo/04Node/04BlogDEMO/04blog1/logs
# 拷贝并重命名
# $(data +%Y-%m-%d-%H) 获取当前时间精确到小时
cp access.log $(date +%Y-%m-%d).access.log
# 清空原文件
echo "">access.log

# 日志脚本地址
# cd F:/Code/vscode/FrontEndCodeDemo/04Node/04BlogDEMO/04blog1/src/utils/copy.sh

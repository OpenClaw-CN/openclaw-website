# 安装

## linux源码安装
::: warning 注意事项
- 演示操作系统：Ubuntu 22.04 LTS
- 演示环境：虚拟机环境或云服务器
- 演示IP：192.168.0.84
- 演示账号：xiaomao
- 演示软件版本：node22
- 本地操作系统：win11
:::


### node安装
``` bash
# 安装长期支持版本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22

# 配置国内加速
npm install -g pnpm
pnpm config set registry https://registry.npmmirror.com/
```

### openclaw安装
#### 克隆仓库
``` bash
git clone https://gitee.com/OpenClaw-CN/openclaw-cn.git
``` 

#### 构建项目
``` bash
cd openclaw-cn
pnpm install
pnpm ui:build
pnpm build
``` 

#### 启动初始化向导
``` bash
pnpm openclaw onboard --install-daemon
# 选择 yes
# 选择 QuickStart
# 选择 DeepSeek
# 选择 DeepSeek API key
# 输入你的deepseek API KYE：sk-3592f2d53755486da45f800e3e****** （记得交钱，否则回复消息为空）
# 选择 Keep current (deepseek/deepseek-chat)
# 选择 Skip for now
# 选择 yes
# 选择 yes
# 选择 pnpm
# 选择 Skip for now (You can add channels later via `openclaw channels add`)
# 选择 no
# 选择 no
# 选择 no
# 选择 no
# 选择 no
# 选择 no
# 选择 no
# 选择 Open the Web UI
``` 

#### 查看消息片段
包含了启动地址、令牌等信息，后面使用
``` bash
◇  Dashboard ready ────────────────────────────────────────────────────────────────╮
│                                                                                  │
│  Dashboard link (with token):                                                    │
│  http://127.0.0.1:18789/?token=cbf24b612f195e12847b939b2af8ad45a54a69ebc371ef55  │
│  Copy/paste this URL in a browser on this machine to control OpenClaw.           │
│  No GUI detected. Open from your computer:                                       │
│  ssh -N -L 18789:127.0.0.1:18789 xiaomao@192.168.0.84                            │
│  Then open:                                                                      │
│  http://localhost:18789/                                                         │
│  http://localhost:18789/?token=cbf24b612f195e12847b939b2af8ad45a54a69ebc371ef55  │
│  Docs:                                                                           │
│  https://docs.openclaw.ai/gateway/remote                                         │
│  https://docs.openclaw.ai/web/control-ui                                         │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────╯
``` 

#### 本地浏览器调试
- win11 cmd窗口输入
``` bash
ssh -N -L 18789:127.0.0.1:18789 xiaomao@192.168.0.84
# 输入linux服务器密码 （不要关闭窗口）
``` 

- 浏览器打开
``` bash
http://localhost:18789/?token=cbf24b612f195e12847b939b2af8ad45a54a69ebc371ef55 
```
- 打开chat菜单，输入框输入如下内容：
``` txt
请帮我在桌面上创建一个名为 hello_openclaw.txt 的文件，并在里面写入：大道至简，实战落地。
``` 
- 校验
``` txt
检查是否生成文件和内容
```

#### 外网访问
- 安装nginx
``` bash
sudo apt update
sudo apt install nginx -y
sudo rm /etc/nginx/sites-available/default
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/openclaw.key \
    -out /etc/nginx/ssl/openclaw.crt \
    -subj "/C=CN/ST=State/L=City/O=OpenClaw/CN=localhost"
```

- 配置https
``` bash
sudo vi /etc/nginx/sites-available/openclaw # 复制下面内容并保存
```

``` bash
    # HTTP 重定向到 HTTPS
    server {
        listen 80;
        server_name _;  # 匹配任意 host

        location / {
            return 301 https://$host$request_uri;
        }
    }

    # HTTPS 反向代理（使用自签名证书）
    server {
        listen 443 ssl http2;
        server_name _;

        ssl_certificate /etc/nginx/ssl/openclaw.crt;
        ssl_certificate_key /etc/nginx/ssl/openclaw.key;

        # 安全性建议（可选但推荐）
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE+AESGCM:DHE+AESGCM:AES256+EECDH:AES256+EDH;
        ssl_prefer_server_ciphers off;

        location / {
            proxy_pass http://127.0.0.1:18789/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_buffering off;
            proxy_cache off;
            proxy_read_timeout 86400;
        }
    }
```     

``` bash
esc :wq
```     

``` bash
sudo ln -s /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```     

- 本地浏览器打开
``` bash
https://192.168.0.84 
``` 
> 请使用谷歌浏览器，其他浏览器可能会导致js报错，导致连不上  
> 接受风险并继续

- 打开菜单
``` bash
Control/Overview
```
- Gateway Token输入框输入token，点击Connect按钮
``` bash
cbf24b612f195e12847b939b2af8ad45a54a69ebc371ef55
```

- linux服务器查看配对设备
``` bash
node openclaw.mjs devices list
┌──────────────────────────────────────┬──────────────────────────────────────────────────────────────────┬──────────┬────────────┬────────┬────────┐
│ Request                              │ Device                                                           │ Role     │ IP         │ Age    │ Flags  │
├──────────────────────────────────────┼──────────────────────────────────────────────────────────────────┼──────────┼────────────┼────────┼────────┤
│ d504ee87-5594-4039-8177-5663ce550689 │ 5bf12aa0aba8f6b419807aec496ba59ba6407557306122647e90a513d8f0a47a │ operator │            │ 8s ago │        │
└──────────────────────────────────────┴──────────────────────────────────────────────────────────────────┴──────────┴────────────┴────────┴────────┘
```

- 添加设备
``` bash
node openclaw.mjs devices approve d504ee87-5594-4039-8177-5663ce550689
```


### 常见问题
- 页面提示：Control UI assets not found. Build them with `pnpm ui:build` (auto-installs UI deps), or run `pnpm ui:dev` during development.
> node openclaw.mjs gateway stop   
> node openclaw.mjs gateway --port 18789 --verbose









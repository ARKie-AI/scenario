## Arkie 基于场景的智能解决方案

## API介绍
- #### 版本 1.0.0
- #### 域名前缀(`endpoint`)：https://api.arkie.cn
#


> ## 根据场景 `id` 获取场景数据


**请求**

- ### 请求URL
  `{{endpoint}}/v1/scenario/:id`

- ### 请求方式
  `GET`
- ### 请求参数


  | 参数 | 必须  |  类型  | 说明   |
  | :--- | :---: | :----: | ------ |
  | id   |   √   | string | 场景ID |

#

#### 响应

- **Content-Type**

  `application/json; charset=utf-8`

- **数据结构**
  
  > ## data

    | 参数      |  类型  | 说明                  |
    | --------- | :----: | --------------------- |
    | id        | string | 场景ID                |
    | name      | string | 场景名称              |
    | `inputs`  | array  | 场景可输入内容集合    |
    | createdAt | string | 场景创建时间          |
    | updatedAt | string | 场景最后一次更新时间 |

    `inputs : [ TextInput | ImageInput ]`

    > ### TextInput

    | 参数        |  类型  | 说明             |
    | ----------- | :----: | ---------------- |
    | id          | string | 输入ID           |
    | name        | string | 输入名称         |
    | type        | string | 输入类型         |
    | label       | string | 输入提示         |
    | placeholder | string | 默认输入内容     |
    | text        | string | 内容             |
    | groupId     | string | 所属输入类别ID   |
    | groupName   | string | 所属输入类别名称 |

    > ### ImageInput

    | 参数      |  类型  | 说明             |
    | --------- | :----: | ---------------- |
    | id        | string | 输入ID           |
    | name      | string | 输入名称         |
    | type      | string | 输入类型         |
    | label     | string | 输入提示         |
    | source    | string | 来源            |
    | imageType | string | 用途             |
    | url       | string | 图片地址         |
    | groupId   | string | 所属输入类别ID   |
    | groupName | string | 所属输入类别名称 |


- **响应码**

  - `200`  成功返回场景数据
  
  - `404`  找不到指定的场景

#

**返回样例**

```json
{
  "data": {
    "id": "Scenario26dd7999-eb19-4940-9b33-6091f12d67e6",
    "name": "demo",
    "inputs": [
      {
        "id": "55e8ff47-05bc-4caf-84e0-2d39d14b9771",
        "name": "heading",
        "label": "标题",
        "type": "text",
        "groupId": "cb8d744b-87c8-489e-b034-776c4982e7bd",
        "groupName": "ATF信息",
        "placeholder": "标题",
        "text": ""
      },
      {
        "id": "51b808a7-57c7-4b25-ba5c-1acfd062858e",
        "name": "subtext",
        "label": "副标题",
        "type": "text",
        "groupId": "cb8d744b-87c8-489e-b034-776c4982e7bd",
        "groupName": "ATF信息",
        "placeholder": "副标题",
        "text": ""
      },
      {
        "id": "eb1d571c-660e-483c-8947-da6eda741df1",
        "name": "logo",
        "label": "LOGO",
        "type": "image",
        "groupId": "cb8d744b-87c8-489e-b034-776c4982e7bd",
        "groupName": "ATF信息",
        "source": "notDisplay",
        "imageType": "logo",
        "url": ""
      }
    ]
  },
  "errors": []
}

```



#
> ## 根据海报 `id` 获取海报数据
#

**请求**

- ### 请求URL
  `{{endpoint}}/v1/poster/:id`

- ### 请求方式
  `GET`
- ### 请求参数


  | 参数 | 必须  |  类型  | 说明   |
  | :--- | :---: | :----: | ------ |
  | id   |   √   | string | 海报ID |

#

#### 响应

- **Content-Type**

  `application/json; charset=utf-8`

- **数据结构**
  
  > ## data

    | 参数         |  类型  | 说明                  |
    | ------------ | :----: | --------------------- |
    | `id`         | string | 海报ID                |
    | `templateId` | string | 海报所属模版ID        |
    | `scenarioId` | string | 海报所属场景ID        |
    | `owner`      | string | 海报所属用户ID        |
    | `inputs`     | array  | 海报可输入内容集合    |
    | `size`       | object | 海报尺寸              |
    | `url`        | string | 海报图片地址          |
    | `createdAt`  | string | 海报创建时间          |
    | `updatedAt`  | string | 海报最后一次更新时间 |

    **`inputs : [ TextInput | ImageInput ]`**

    > ### TextInput

    | 参数          |  类型  | 说明             |
    | ------------- | :----: | ---------------- |
    | `id`          | string | 输入ID           |
    | `name`        | string | 输入名称         |
    | `type`        | string | 输入类型         |
    | `label`       | string | 输入提示         |
    | `placeholder` | string | 默认输入内容     |
    | `text`        | string | 内容             |
    | `groupId`     | string | 所属输入类别ID   |
    | `groupName`   | string | 所属输入类别名称 |

    > ### ImageInput

    | 参数        |  类型  | 说明             |
    | ----------- | :----: | ---------------- |
    | `id`        | string | 输入ID           |
    | `name`      | string | 输入名称         |
    | `type`      | string | 输入类型         |
    | `label`     | string | 输入提示         |
    | `source`    | string | 来源            |
    | `imageType` | string | 用途             |
    | `url`       | string | 图片地址         |
    | `groupId`   | string | 所属输入类别ID   |
    | `groupName` | string | 所属输入类别名称 |
    > ### size

    | 参数     |  类型  | 说明     |
    | -------- | :----: | -------- |
    | `width`  | number | 宽       |
    | `height` | number | 高       |
    | `unit`  | string | 尺寸单位 |

    **`unit : px | mm | cm`**


- **响应码**

  - `200`  成功返回海报数据
  
  - `404`  找不到指定的海报

#

**返回样例**

```json
暂无

```

#
> ## 根据场景 `id` 创建海报
#

**请求**

- ### 请求URL
  `{{endpoint}}/v1/poster`

- ### 请求方式
  `POST`
- ### 请求参数


  | 参数         | 必须  |  类型  | 说明     |
  | :----------- | :---: | :----: | -------- |
  | `scenarioId` |   √   | string | 场景ID   |
  | `templateId` |       | array  | 模版ID   |
  | `inputs`     |   √   | array  | 输入集合 |

    ***如果未指定 `templateId` 系统自动匹配模版生成海报***

  **`inputs : [ TextInput | ImageInput ]`**

    > ### TextInput

    | 参数   | 必须  |  类型  | 说明     |
    | ------ | :---: | :----: | -------- |
    | `id`   |   √   | string | 输入ID   |
    | `name` |   √   | string | 输入名称 |
    | `type` |   √   | string | 输入类型 |
    | `text` |   √   | string | 输入内容 |

    ***`id name type` 值由场景数据的 `inputs` 获取， 不可更改***

    > ### ImageInput

    | 参数        | 必须  |  类型  | 说明     |
    | ----------- | :---: | :----: | -------- |
    | `id`        |   √   | string | 输入ID   |
    | `name`      |   √   | string | 输入名称 |
    | `type`      |   √   | string | 输入类型 |
    | `source`    |   √   | string | 来源    |
    | `imageType` |   √   | string | 用途     |
    | `url`       |   √   | string | 图片地址 |

    `id name type imageType` 值由场景数据的 `inputs` 获取， 不可更改

    `source : byUserAppointed | notDisplay | content`    
     ***使用上传图片时使用*** -  `byUserAppointed`
#

#### 响应

- **Content-Type**

  `application/json; charset=utf-8`

- **数据结构**
  
  > ## data

    | 参数         |  类型  | 说明                  |
    | ------------ | :----: | --------------------- |
    | `id`         | string | 海报ID                |
    | `templateId` | string | 海报所属模版ID        |
    | `scenarioId` | string | 海报所属场景ID        |
    | `owner`      | string | 海报所属用户ID        |
    | `inputs`     | array  | 海报可输入内容集合    |
    | `size`       | object | 海报尺寸              |
    | `url`        | string | 海报图片地址          |
    | `createdAt`  | string | 海报创建时间          |
    | `updatedAt`  | string | 海报最后一次更新时间 |

    **`inputs : [ TextInput | ImageInput ]`**

    > ### TextInput

    | 参数          |  类型  | 说明             |
    | ------------- | :----: | ---------------- |
    | `id`          | string | 输入ID           |
    | `name`        | string | 输入名称         |
    | `type`        | string | 输入类型         |
    | `label`       | string | 输入提示         |
    | `placeholder` | string | 默认输入内容     |
    | `text`        | string | 内容             |
    | `groupId`     | string | 所属输入类别ID   |
    | `groupName`   | string | 所属输入类别名称 |

    > ### ImageInput

    | 参数        |  类型  | 说明             |
    | ----------- | :----: | ---------------- |
    | `id`        | string | 输入ID           |
    | `name`      | string | 输入名称         |
    | `type`      | string | 输入类型         |
    | `label`     | string | 输入提示         |
    | `source`    | string | 来源            |
    | `imageType` | string | 用途             |
    | `url`       | string | 图片地址         |
    | `groupId`   | string | 所属输入类别ID   |
    | `groupName` | string | 所属输入类别名称 |
    > ### size

    | 参数     |  类型  | 说明     |
    | -------- | :----: | -------- |
    | `width`  | number | 宽       |
    | `height` | number | 高       |
    | `unit`  | string | 尺寸单位 |

    **`unit : px | mm | cm`**



- **响应码**

  - `200`  成功返回海报数据

  - `400`  错误的请求参数
  
  - `404`  找不到指定的海报

#

**返回样例**

```json
暂无

```

#
> ## 根据海报 `id` 修改海报
#

**请求**

- ### 请求URL
  `{{endpoint}}/v1/poster/:id`

- ### 请求方式
  `PUT`
- ### 请求参数


  | 参数     | 必须  | 类型  | 说明     |
  | :------- | :---: | :---: | -------- |
  | `inputs` |   √   | array | 输入集合 |

  **`inputs : [ TextInput | ImageInput ]`**

    > ### TextInput

    | 参数   | 必须  |  类型  | 说明     |
    | ------ | :---: | :----: | -------- |
    | `id`   |   √   | string | 输入ID   |
    | `name` |   √   | string | 输入名称 |
    | `type` |   √   | string | 输入类型 |
    | `text` |   √   | string | 输入内容 |

    ***`id name type` 值由场景数据的 `inputs` 获取， 不可更改***

    > ### ImageInput

    | 参数        | 必须  |  类型  | 说明     |
    | ----------- | :---: | :----: | -------- |
    | `id`        |   √   | string | 输入ID   |
    | `name`      |   √   | string | 输入名称 |
    | `type`      |   √   | string | 输入类型 |
    | `source`    |   √   | string | 来源    |
    | `imageType` |   √   | string | 用途     |
    | `url`       |   √   | string | 图片地址 |

    `id name type imageType` 值由场景数据的 `inputs` 获取， 不可更改

    `source : byUserAppointed | notDisplay | content`    
     ***使用上传图片时使用*** -  `byUserAppointed`
#

#### 响应

- **Content-Type**

  `application/json; charset=utf-8`

- **数据结构**
  
  > ## data

    | 参数         |  类型  | 说明                  |
    | ------------ | :----: | --------------------- |
    | `id`         | string | 海报ID                |
    | `templateId` | string | 海报所属模版ID        |
    | `scenarioId` | string | 海报所属场景ID        |
    | `owner`      | string | 海报所属用户ID        |
    | `inputs`     | array  | 海报可输入内容集合    |
    | `size`       | object | 海报尺寸              |
    | `url`        | string | 海报图片地址          |
    | `createdAt`  | string | 海报创建时间          |
    | `updatedAt`  | string | 海报最后一次更新时间 |

    **`inputs : [ TextInput | ImageInput ]`**

    > ### TextInput

    | 参数          |  类型  | 说明             |
    | ------------- | :----: | ---------------- |
    | `id`          | string | 输入ID           |
    | `name`        | string | 输入名称         |
    | `type`        | string | 输入类型         |
    | `label`       | string | 输入提示         |
    | `placeholder` | string | 默认输入内容     |
    | `text`        | string | 内容             |
    | `groupId`     | string | 所属输入类别ID   |
    | `groupName`   | string | 所属输入类别名称 |

    > ### ImageInput

    | 参数        |  类型  | 说明             |
    | ----------- | :----: | ---------------- |
    | `id`        | string | 输入ID           |
    | `name`      | string | 输入名称         |
    | `type`      | string | 输入类型         |
    | `label`     | string | 输入提示         |
    | `source`    | string | 来源            |
    | `imageType` | string | 用途             |
    | `url`       | string | 图片地址         |
    | `groupId`   | string | 所属输入类别ID   |
    | `groupName` | string | 所属输入类别名称 |
    > ### size

    | 参数     |  类型  | 说明     |
    | -------- | :----: | -------- |
    | `width`  | number | 宽       |
    | `height` | number | 高       |
    | `unit`  | string | 尺寸单位 |

    **`unit : px | mm | cm`**



- **响应码**

  - `200`  成功返回海报数据

  - `400`  错误的请求参数
  
  - `404`  找不到指定的海报

#

**返回样例**

```json
暂无

```

#
> ## 根据海报 `id` 删除海报
#

**请求**

- ### 请求URL
  `{{endpoint}}/v1/poster/:id`

- ### 请求方式
  `DELETE`
- ### 请求参数

  无参数


#### 响应

- **Content-Type**

  `application/json; charset=utf-8`

- **数据结构**
  
  空

- **响应码**

  - `204`  成功返回海报数据

  - `404`  找不到指定的海报

#

**返回样例**

```json

```




> ## 根据关键字 `keyword` 搜索免费图片
#

**请求**

- ### 请求URL
  `{{endpoint}}/v1/image`

- ### 请求方式
  `GET`
- ### 请求参数


  | 参数    | 必须  |  类型  | 说明                         |
  | :------ | :---: | :----: | ---------------------------- |
  | keyword |   √   | string | 关键词，关键词之间用空格隔开 |
  | skip    |       | number | 指定搜索记录的开始位置      |
  | limit   |       | number | 返回的图片数目               |

#

#### 响应

- **Content-Type**

  `application/json; charset=utf-8`

- **数据结构**
  
  > ## data

    | 参数     |  类型  | 说明               |
    | -------- | :----: | ------------------ |
    | limit    | number | 返回的图片数目     |
    | skip     | number | 搜索记录的开始位置 |
    | `result` | array  | 图片集合           |
    | count    | number | 符合搜索的图片总数 |

    `result : [ Image ]`

    > ### Image

    | 参数       |  类型  | 说明       |
    | ---------- | :----: | ---------- |
    | id         | string | 图片ID     |
    | width      | number | 图片宽度   |
    | height     | number | 图片高度   |
    | aspect     | number | 图片比例   |
    | previewUrl | string | 预览图地址 |
    | url        | string | 图片地址   |

- **响应码**

  - `200`  成功返回场景数据
  

#

**返回样例**

```json
{
  "data": {
    "result": [
      {
        "id": "5a75c59fc9d4c416af28a700",
        "aspect": 1.5,
        "width": 960,
        "height": 640,
        "url": "http://resource.arkie.cn/resource/image/pixabay/type/3_evening-sky-335969_960_720.jpg",
        "previewUrl": "http://resource.arkie.cn/resource/image/pixabay/type/3_evening-sky-335969_960_720.jpg?x-oss-process=image/resize,w_300"
      },
      {
        "id": "5a75c59fc9d4c416af28a70e",
        "aspect": 1.8532818532818534,
        "width": 960,
        "height": 518,
        "url": "http://resource.arkie.cn/resource/image/pixabay/type/3_buildings-1846728_960_720.jpg",
        "previewUrl": "http://resource.arkie.cn/resource/image/pixabay/type/3_buildings-1846728_960_720.jpg?x-oss-process=image/resize,w_300"
      },
      {
        "id": "5a75c59fc9d4c416af28a752",
        "aspect": 1.3351877607788596,
        "width": 960,
        "height": 719,
        "url": "http://resource.arkie.cn/resource/image/pixabay/type/4_mar-922253_960_720.jpg",
        "previewUrl": "http://resource.arkie.cn/resource/image/pixabay/type/4_mar-922253_960_720.jpg?x-oss-process=image/resize,w_300"
      }
    ],
    "count": 12702,
    "skip": 0,
    "limit": 3
  },
  "errors": []
}


```



> ## 上传图片到服务器
#

**请求**

- ### 请求URL
  `{{endpoint}}/v1/image/upload`

- ### 请求方式
  `POST`
- ### 请求参数


  | 参数 | 必须  | 类型  | 说明 |
  | :--- | :---: | :---: | ---- |

#

#### 响应

- **Content-Type**

  `application/json; charset=utf-8`

- **数据结构**
  
  > ## data :  File[]

    | 参数   | 类型  | 说明           |
    | ------ | :---: | -------------- |
    | `file` | File  | 图片上传信息 |


    > ### File

    | 参数       |  类型  | 说明     |
    | ---------- | :----: | -------- |
    | `filename` | string | 图片名称 |
    | `mimetype` | string | 图片格式 |
    | `url`      | string | 图片地址 |

   
**返回样例**

```json
{
  "data": [
    {
      "filename": "demo.jpg",
      "mimetype": "image/jpeg",
      "url": "https://arkie-public.oss-cn-hangzhou.aliyuncs.com/resources/eeaad45f-1ba3-4065-93ba-91289fee3c0c.jpg"
    }
  ],
  "errors": []
}
```
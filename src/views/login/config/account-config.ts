// 校验规则, 规则数组，可以存在多个
export const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur" // 什么时候触发校验
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: "用户名必须由3-10个字母或数字组成",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur" // 什么时候触发校验
    },
    {
      pattern: /^[a-z0-9]{6,16}$/,
      message: "密码必须由6-16个字母或数字组成",
      trigger: "blur"
    }
  ]
}

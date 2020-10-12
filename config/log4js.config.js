const path = require("path");
const ROOT = path.join(__dirname,"../");

module.exports = {
  appenders:{
    ConsoleLogAppender:{
      type: "console"
    },
    FileLogAppender:{
      type: "file",
      filename: path.join(ROOT,"./log/system/system.log"),
      maxLogSize: 5000000,
      bakups: 10,
      compress: true
    },
    MultiFileLogAppender:{
      type: "multiFile",
      base: path.join(ROOT, "./log/application/"),
      property: "key",
      extension: ".log",
      maxLogSize: 5000000,
      backups: 5,
      compress: true
    },
    DateRollingFileLogAppender: {
      type: "dateFile",
      filename: path.join(ROOT,"./log/access/access.log"),
      pattern: ".yyyy-MM-dd",
      daysToKeep: 30
    }
  },
  categories:{
    "default":{
      appenders:["ConsoleLogAppender"],
      level: "ALL"
    },
    system:{
      appenders: ["FileLogAppender"],
      level: "ERROR"
    },
    application:{
      appenders: ["MultiFileLogAppender"],
      level: "ALL"

    },
    access: {
      appenders: ["DateRollingFileLogAppender"],
      level: "INFO"
    }
  }
  
};
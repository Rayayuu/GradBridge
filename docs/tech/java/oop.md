---
title: Java OOP：从概念到工程
description: 用工程和面试视角理解 Encapsulation、Inheritance、Polymorphism、Abstraction、Interface 与 Composition。
keywords:
  - Java
  - OOP
  - Encapsulation
  - Polymorphism
  - Interface
---

# Java OOP：从概念到工程

OOP 经常被背成“四大特性”，但真正重要的是理解：

> 为什么大型程序需要把数据、行为和变化隔离在清晰的边界里。

## Encapsulation

Encapsulation 的核心不是 private 关键字本身。

它真正解决的是：

- 谁可以修改内部状态
- 状态如何被修改
- 哪些实现细节不应该暴露
- 如何保证对象始终处于合法状态

例如 BankAccount 不应该允许外部代码随意修改 balance。

更合理的方式是通过 deposit、withdraw 等方法控制状态变化。

## Abstraction

Abstraction 关注的是：

> 使用者需要知道什么，而不需要知道什么。

调用 paymentService.pay() 的代码通常不需要知道内部如何调用第三方支付 API。

这可以降低模块之间的耦合。

## Inheritance

Inheritance 表达一种 is-a 关系。

例如 Dog extends Animal。

它可以复用行为，但也可能带来强耦合和层级复杂度。

因此真实工程中不能看到重复代码就立即使用继承。

## Polymorphism

Polymorphism 允许相同接口对应不同实现。

例如：

```java
PaymentProcessor processor = new StripeProcessor();
processor.pay();
```

调用者依赖 PaymentProcessor，而不是具体依赖 Stripe。

这使实现可以替换。

## Interface

Interface 非常适合定义行为契约。

例如：

```java
interface NotificationService {
    void send(String message);
}
```

以后可以存在 EmailNotificationService、SmsNotificationService 等多个实现。

## Composition vs Inheritance

Composition 表示 has-a。

例如 OrderService has a PaymentService。

它通常比深层继承结构更灵活，因为组件可以被替换、组合和单独测试。

## 项目里什么时候真正会用到

Backend 项目中常见：

- Controller 依赖 Service
- Service 依赖 Repository
- Interface 定义能力
- Dependency Injection 提供具体实现

这些设计都和 OOP 的抽象与解耦有关。

## 面试怎么回答

不要只说：

> OOP 有封装、继承、多态、抽象。

更好的结构是：

1. 先说 OOP 是组织复杂程序的一种方式
2. 解释每个概念解决什么问题
3. 给出项目中的真实例子
4. 说明继承和组合之间的取舍

## 常见追问

- Interface 和 abstract class 有什么区别？
- Overloading 和 overriding 有什么区别？
- 为什么 prefer composition over inheritance？
- Dependency Injection 和 OOP 有什么关系？

## 最后

真正理解 OOP，不是能背出定义。

> 是看到一个系统时，知道应该把哪些变化隔离、哪些能力抽象，以及不同对象之间应该如何协作。

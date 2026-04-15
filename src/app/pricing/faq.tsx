"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    q: "免费额度有什么限制？",
    a: "免费版包含每月 $5 等值的 API 调用额度，支持所有 30+ 模型，无功能限制。超出部分自动按量计费，不会中断服务。",
  },
  {
    q: "支持哪些支付方式？",
    a: "支持支付宝、微信支付、Stripe（国际信用卡）、Creem。企业客户可申请对公转账和增值税发票。",
  },
  {
    q: "可以随时更换套餐吗？",
    a: "可以。升级即时生效，降级在当前计费周期结束后生效。未使用的额度按剩余天数比例退还到钱包。",
  },
  {
    q: "企业版有什么额外能力？",
    a: "私有部署 / 混合云、专属客户成功经理、99.9% SLA 保障、自定义计费规则（阶梯价/包年折扣）、审计日志、OIDC SSO 集成、专属技术支持群。",
  },
  {
    q: "API 调用失败会扣费吗？",
    a: "不会。只有成功返回结果的请求才会计入用量。网络超时、上游模型错误、速率限制拒绝等场景均不扣费。",
  },
  {
    q: "可以设置用量预警和硬性上限吗？",
    a: "可以。在控制台设置用量阈值后，系统会通过邮件和 WebSocket 推送预警。也可以设置硬性额度上限，超出后自动停止调用，防止意外账单。",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
      >
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] pr-4 group-hover:text-[var(--color-ochre)] transition-colors">
          {q}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
        >
          <ChevronDownIcon className="w-5 h-5 text-[var(--color-text-muted)]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 -mt-1">
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            <span className="text-gradient-gold">常见问题</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            找不到答案？
            <a
              href="mailto:support@lurus.cn"
              className="text-[var(--color-ochre)] hover:underline ml-1"
            >
              联系我们
            </a>
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <FAQItem
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

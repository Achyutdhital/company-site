'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { submitContact } from '../../lib/api'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  serviceInterest: z.string().optional(),
  pricingPlan: z.string().optional(),
  message: z.string().min(10)
})

type FormData = z.infer<typeof schema>

export default function ContactForm({ defaultPlan }: { defaultPlan?: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { pricingPlan: defaultPlan || '' } })
  const [success, setSuccess] = useState(false)
  const serviceOptions = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'seo', label: 'SEO' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'app-development', label: 'App Development' },
    { value: 'web-security', label: 'Web Security' },
    { value: 'cloud-solutions', label: 'Cloud Solutions' },
  ]

  useEffect(() => {
    if (defaultPlan) setValue('pricingPlan', defaultPlan)
  }, [defaultPlan, setValue])

  async function onSubmit(data: FormData) {
    try {
      await submitContact({ ...data, pricingPlan: data.pricingPlan || defaultPlan || '' })
      setSuccess(true)
      reset()
    } catch (e) {
      console.error(e)
      alert('Submission failed')
    }
  }

  if (success) return (<div className="p-6 glass rounded-2xl text-text-primary">Thank you — we received your message.</div>)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register('name')} placeholder="Name" className="w-full rounded-2xl border border-bg-border bg-bg-secondary/80 px-4 py-3 text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20" />
        {errors.name && <div className="text-sm text-red-400">{errors.name.message}</div>}
      </div>
      <div>
        <input {...register('email')} placeholder="Email" className="w-full rounded-2xl border border-bg-border bg-bg-secondary/80 px-4 py-3 text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20" />
        {errors.email && <div className="text-sm text-red-400">{errors.email.message}</div>}
      </div>
      <div>
        <input {...register('phone')} placeholder="Phone" className="w-full rounded-2xl border border-bg-border bg-bg-secondary/80 px-4 py-3 text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20" />
      </div>
      <div>
        <Select.Root value={watch('serviceInterest') || ''} onValueChange={(value) => setValue('serviceInterest', value, { shouldDirty: true, shouldTouch: true, shouldValidate: true })}>
          <Select.Trigger className="w-full rounded-2xl border border-bg-border bg-bg-secondary/80 px-4 py-3 flex items-center justify-between text-left text-text-primary outline-none transition-colors focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20">
            <Select.Value placeholder="Select a service" />
            <Select.Icon>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-50 overflow-hidden rounded-2xl border border-bg-border bg-bg-secondary/95 text-text-primary shadow-2xl backdrop-blur-xl">
              <Select.Viewport className="p-2">
                {serviceOptions.map((option) => (
                  <Select.Item key={option.value} value={option.value} className="relative flex cursor-pointer select-none items-center rounded-xl py-2.5 pl-9 pr-3 text-sm outline-none transition-colors data-[highlighted]:bg-brand-primary/10 data-[highlighted]:text-brand-primary">
                    <Select.ItemIndicator className="absolute left-3 inline-flex items-center">
                      <Check className="h-4 w-4" />
                    </Select.ItemIndicator>
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div>
        <textarea {...register('message')} placeholder="Message" className="w-full rounded-2xl border border-bg-border bg-bg-secondary/80 px-4 py-3 text-text-primary placeholder:text-text-muted outline-none transition-colors min-h-[120px] focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20" />
        {errors.message && <div className="text-sm text-red-400">{errors.message.message}</div>}
      </div>
      <input type="hidden" {...register('serviceInterest')} />
      <input type="hidden" {...register('pricingPlan')} />
      <div>
        <button type="submit" disabled={isSubmitting} className="px-5 py-3 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold shadow-lg shadow-brand-primary/20">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}

// 'use client';

import {Card} from '@tremor/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}


export default function ToplineCard({item}) {
    return (
        <Card key={item.name}>
            <div className="flex items-center justify-between gap-1">
                <dt className="flex-1 min-w-0 text-tremor-default font-medium text-tremor-content overflow-hidden">
                    <span className="block w-full whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>
                </dt>
                <span
                    className={classNames(
                        item.changeType === 'positive'
                            ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10'
                            : 'bg-red-100 text-red-800 ring-red-600/10',
                        'inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset',
                    )}
                >
                {item.change}
              </span>
            </div>
            <dd className="text-tremor-metric font-semibold text-tremor-content-strong">
                {item.stat}
                <span className="font-bold text-base opacity-40 tracking-widest pl-1">/5</span>
            </dd>
        </Card>
    );
}
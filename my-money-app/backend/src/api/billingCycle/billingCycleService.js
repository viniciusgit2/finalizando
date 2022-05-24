import BillingCycle, { methods, updateOptions, after, route, count, aggregate } from './billingCycle'
import errorHandler from '../common/errorHandler'

methods(['get', 'post', 'put', 'delete'])
updateOptions({new: true, runValidators: true})
after('post', errorHandler).after('put', errorHandler)

route('count', (req, res, next) => {
    count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

route('summary', (req, res, next) => {
    aggregate({
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
    }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, {
        $project: {_id: 0, credit: 1, debt: 1}
    }, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

export default BillingCycle
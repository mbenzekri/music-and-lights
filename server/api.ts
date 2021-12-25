import { app } from './app'
import { music } from  './music'
/** 
 * @openapi 
 *  /music: 
 *      description: get all the music list by chunks (to get next chunk set index and count parameters) 
 *      get: 
 *          parameters:
 *              - in: path
 *                name: limit
 *                description: max musix items to retrieve
 *                schema: { "type" : "integer", "required": false, "default": 100 }
 *              - in: path
 *                name: pattern
 *                description: list of pattern prefixes to filter result
 *                schema: { "type" : "string", "required": false, default: null }
 *      responses:  
 *          200: 
 *              description: Success  
 *   
 */
app.get('/music', (req, res) => {
    const limit = req.query.index && /^\d+$/.test(req.query.limit as string) ? parseInt(req.query.limit as string,10) : 100
    const pattern = req.query.pattern as string 
    const list = music.list(limit,pattern)
    res.send(list)
})

/** 
 * @openapi 
 *  /music: 
 *      description: play a music item 
 *      get: 
 *      responses:  
 *          200: 
 *              description: Success  
 *   
 */
 app.get('/music/:id/play', (req, res) => {
    const id = parseInt(req.params.id,10)
    music.play(id)
    res.send({})
})

/** 
 * @openapi 
 * /Employees: 
 *   post: 
 *     description: Create an Employee 
 *     parameters: 
 *     - name: EmployeeName 
 *       description: Create an new employee 
 *       in: formData 
 *       required: true 
 *       type: String 
 *     responses:  
 *       201: 
 *         description: Created  
 *   
 */
app.post('/Employees', (req, res) => {
    res.status(201).send()
})
/** 
 * @openapi 
 * /Employees: 
 *   put: 
 *     description: Create an Employee 
 *     parameters: 
 *     - name: EmployeeName 
 *       description: Create an new employee 
 *       in: formData 
 *       required: true 
 *       type: String 
 *     responses:  
 *       201: 
 *         description: Created  
 *   
 */
app.put('/Employees', (req, res) => {
    res.status(201).send()
})
/** 
* @openapi 
* /Employees: 
*   delete: 
*     description: Create an Employee 
*     parameters: 
*     - name: EmployeeName 
*       description: Create an new employee 
*       in: formData 
*       required: true 
*       type: String 
*     responses:  
*       201: 
*         description: Created  
*   
*/
app.delete('/Employees', (req, res) => {
    res.status(201).send()
})

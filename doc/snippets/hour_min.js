<Form.Group controlId="formTaskHour" className="control-inline">
      <Form.Label className="control-block label">Hour:Min</Form.Label>
                    <Form.Control 
                      type="number"
                      step="1"
                      min="0"
                      max="24"
                      className="control-inline"
                      defaultValue='0'/>
                  </Form.Group>

    <Form.Group controlId="formTaskMin" className="control-inline">
                    <Form.Label className="control-dot">:</Form.Label>
                    <Form.Control 
                      type="number"
                      step="1"
                      min="0"
                      className="control-inline"
                      max="59"
                   defaultValue = '0' />
              </Form.Group>

